import ServiceError from '@shared/core/ServiceError';

export default class PasswordNoesNotMatchError extends ServiceError {
  constructor() {
    super('Old password does not match.', 400);
  }
}
