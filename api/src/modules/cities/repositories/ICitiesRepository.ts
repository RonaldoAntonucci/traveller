import City from '../domain/City';
import ICreateCityDTO from '../dtos/ICreateCityDTO';

export default interface ICitiesRepository {
  create(data: ICreateCityDTO): Promise<City>;
  findByName(name: string): Promise<City | undefined>;
}
