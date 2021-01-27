import ServiceError from '@shared/core/ServiceError';

export default class ImageIsRequiredError extends ServiceError {
  constructor() {
    super(`Validation Failed. "image" is required`, 400);
  }
}
