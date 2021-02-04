import Entity from '@shared/domain/Entity';

export default class Address extends Entity {
  zipCode: string;

  street: string;

  neighborhood: string;

  number?: string;
}
