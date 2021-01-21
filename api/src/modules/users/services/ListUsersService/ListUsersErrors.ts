/* eslint-disable import/prefer-default-export */
import ServiceError from '@shared/core/ServiceError';

export class InvalidParamsError extends ServiceError {
  constructor() {
    super('Invalid paginations params.', 400);
  }
}
