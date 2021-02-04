import IRepository from '@shared/core/IRepository';

import Place from '../domain/Place';
import ICreatePlaceDTO from '../dtos/ICreatePlaceDTO';

export default interface IPlacesRepository extends IRepository<Place> {
  create(data: ICreatePlaceDTO): Promise<Place>;

  findByName(name: string): Promise<undefined | Place>;
}
