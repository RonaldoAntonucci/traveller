import IDeleteUserDTO from '@modules/cities/dtos/IDeleteUserDTO';
import { CityNotExistsError } from '@modules/cities/errors/service';
import IStorageProvider from '@modules/cities/providers/StorageProvider/IStorageProvider';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

type Request = IDeleteUserDTO;

type Response = number;

@injectable()
export default class DeleteCityService implements IService<Request, Response> {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ cityId }: Request): Promise<Response> {
    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      throw new CityNotExistsError(cityId);
    }

    if (city.image) {
      await this.storageProvider.deleteFile(city.image);
    }

    const deleteResult = (await this.citiesRepository.delete(cityId)) as number;

    return deleteResult;
  }
}
