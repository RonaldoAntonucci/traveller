import IRepository from '@shared/core/IRepository';
import City from '../domain/City';
import ICreateCityDTO from '../dtos/ICreateCityDTO';

export default interface ICitiesRepository extends IRepository<City> {
  create(data: ICreateCityDTO): Promise<City>;

  findByName(name: string): Promise<City | undefined>;
}
