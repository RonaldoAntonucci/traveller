import ServiceError from '@shared/core/ServiceError';

export default class CityNotExistsError extends ServiceError {
  constructor(id: string) {
    super(`This city with id:${id} not exists.`, 400);
  }
}
