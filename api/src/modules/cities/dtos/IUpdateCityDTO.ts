import City from '../domain/City';

export default interface IUpdateCityDTO extends Partial<Omit<City, 'image'>> {
  cityId: string;
}
