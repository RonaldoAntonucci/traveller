import ServiceError from '@shared/core/ServiceError';

export default class InvalidParamsError extends ServiceError {
  constructor() {
    super('Invalid paginations params.', 400);
  }
}
