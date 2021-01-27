import City from '@modules/cities/domain/City';
import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import {
  ImageInvalidError,
  NameAlreadyExistsError,
} from '@modules/cities/errors/service';
import IStorageProvider from '@modules/cities/providers/StorageProvider/IStorageProvider';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateCityService
  implements IService<ICreateCityDTO, City> {
  constructor(
    @inject('CitiesRepository')
    private citiesRepo: ICitiesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    description,
    image,
    name,
  }: ICreateCityDTO): Promise<City> {
    const nameExists = await this.citiesRepo.findByName(name);

    if (nameExists) {
      throw new NameAlreadyExistsError(name);
    }

    const fileName = await this.storageProvider.saveFile(image);

    if (!fileName) {
      throw new ImageInvalidError();
    }

    const city = await this.citiesRepo.create({
      description,
      image: fileName,
      name,
    });

    return city;
  }
}
