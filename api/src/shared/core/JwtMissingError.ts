import AppError from './AppError';

export default class JwtMissingError extends AppError {
  constructor() {
    super('JWT token is missing.', 401);
  }
}
