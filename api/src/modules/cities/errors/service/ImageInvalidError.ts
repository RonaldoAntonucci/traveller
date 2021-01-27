import ServiceError from '@shared/core/ServiceError';

export default class ImageInvalidError extends ServiceError {
  constructor() {
    super('This image is invalid.', 400);
  }
}
