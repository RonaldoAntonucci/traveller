import ServiceError from '@shared/core/ServiceError';

export default class EmailAlreadyExistsError extends ServiceError {
  constructor(email: string) {
    super(
      `The email ${email} associated for this account already exists.`,
      400,
    );
  }
}
