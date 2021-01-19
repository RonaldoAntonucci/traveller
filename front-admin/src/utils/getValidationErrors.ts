import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default (err: ValidationError): Errors => {
  const validationErrors: Errors = {};

  err.inner.forEach((error: ValidationError) => {
    validationErrors[error.path as string] = error.message;
  });

  return validationErrors;
};
