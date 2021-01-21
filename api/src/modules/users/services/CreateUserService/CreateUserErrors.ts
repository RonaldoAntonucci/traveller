/* eslint-disable import/prefer-default-export */
import ServiceError from '@shared/core/ServiceError';

export class EmailAlreadyExistsError extends ServiceError {
  constructor(email: string) {
    super(
      `The email ${email} associated for this account already exists.`,
      400,
    );
  }
}
