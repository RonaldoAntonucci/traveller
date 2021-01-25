import ServiceError from '@shared/core/ServiceError';

export default class NameAlreadyExistsError extends ServiceError {
  constructor(name: string) {
    super(`The name ${name} associated for this city already exists.`, 400);
  }
}
