import ServiceError from '@shared/core/ServiceError';

export default class EmailAndPasswordError extends ServiceError {
  constructor() {
    super('Incorrect email/password combination.', 401);
  }
}
