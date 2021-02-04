import Place from '@modules/cities/domain/Place';
import ICreatePlaceDTO from '@modules/cities/dtos/ICreatePlaceDTO';
import { NameAlreadyExistsError } from '@modules/cities/errors/service';

import IPlacesRepository from '@modules/cities/repositories/IPlacesRepository';
import IService from '@shared/core/IService';
import { injectable, inject } from 'tsyringe';

type Request = ICreatePlaceDTO;
type Response = Place;

@injectable()
export default class CreatePlaceService implements IService<Request, Response> {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,
  ) {}

  public async execute({
    name,
    categoryId,
    description,
    address,
  }: Request): Promise<Response> {
    const nameExists = await this.placesRepository.findByName(name);

    if (nameExists) {
      throw new NameAlreadyExistsError(name, 'place');
    }

    const place = await this.placesRepository.create({
      name,
      description,
      categoryId,
      address,
    });

    return place;
  }
}
