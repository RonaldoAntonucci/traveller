import ListResponse from '@shared/core/ListResponse';
import PaginationParams from '@shared/core/PaginationParams';
import City from '../domain/City';
import ICreateCityDTO from '../dtos/ICreateCityDTO';

export default interface ICitiesRepository {
  create(data: ICreateCityDTO): Promise<City>;

  findByName(name: string): Promise<City | undefined>;

  findAndCount(data: PaginationParams): Promise<ListResponse<City>>;
}
