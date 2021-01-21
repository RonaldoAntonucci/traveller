import ServiceError from '@shared/core/ServiceError';

export default class UserNotExistsError extends ServiceError {
  constructor(id: string) {
    super(`This user with id:${id} not exists.`, 400);
  }
}
