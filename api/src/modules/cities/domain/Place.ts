import Entity from '@shared/domain/Entity';

export default class Place extends Entity {
  name: string;

  image: string;

  description: string;

  categoryId: string;

  addressId: number;
}
