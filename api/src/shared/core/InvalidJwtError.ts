import AppError from './AppError';

export default class InvalidJwtError extends AppError {
  constructor() {
    super('Invalid JWT token.', 401);
  }
}
