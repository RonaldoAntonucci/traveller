/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import ServiceError from '@shared/core/ServiceError';

export class UserNotExistsError extends ServiceError {
  constructor(id: string) {
    super(`This user with id:${id} not exists.`, 400);
  }
}

export class EmailAlreadyExistsError extends ServiceError {
  constructor(email: string) {
    super(
      `The email ${email} associated for this account already exists.`,
      400,
    );
  }
}

export class PasswordNoesNotMatchError extends ServiceError {
  constructor() {
    super('Old password does not match.', 400);
  }
}
