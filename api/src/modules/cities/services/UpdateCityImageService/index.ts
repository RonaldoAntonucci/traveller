import City from '@modules/cities/domain/City';
import IUpdateCityImageDTO from '@modules/cities/dtos/IUpdateCityImageDTO';
import {
  CityNotExistsError,
  ImageInvalidError,
} from '@modules/cities/errors/service';
import IStorageProvider from '@modules/cities/providers/StorageProvider/IStorageProvider';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

type Request = IUpdateCityImageDTO;
type Response = City;

@injectable()
export default class UpdateCityImageService
  implements IService<Request, Response> {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ cityId, imageFilename }: Request): Promise<Response> {
    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      throw new CityNotExistsError(cityId);
    }

    if (city.image) {
      await this.storageProvider.deleteFile(city.image);
    }

    const fileName = await this.storageProvider.saveFile(imageFilename);

    if (!fileName) {
      throw new ImageInvalidError();
    }

    city.image = fileName;

    return this.citiesRepository.save(city);
  }
}
