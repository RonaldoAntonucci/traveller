import ServiceError from '@shared/core/ServiceError';

export default class CategoryNotExistsError extends ServiceError {
  constructor(id: string) {
    super(`This category with id:${id} not exists.`, 400);
  }
}
