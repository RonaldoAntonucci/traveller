import ServiceError from '@shared/core/ServiceError';

export default class OldPasswordIsRequiredError extends ServiceError {
  constructor() {
    super('You need to inform the old password to set a new password.', 400);
  }
}
