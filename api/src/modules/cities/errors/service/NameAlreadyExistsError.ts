import ServiceError from '@shared/core/ServiceError';

export default class NameAlreadyExistsError extends ServiceError {
  constructor(name: string, entity = 'ctiy') {
    super(
      `The name ${name} associated for this ${entity} already exists.`,
      400,
    );
  }
}
