import ServiceError from '@shared/core/ServiceError';

export default class MaxCategoriesError extends ServiceError {
  constructor(count: number) {
    super(`Maximum of ${count} categories reached.`, 400);
  }
}
