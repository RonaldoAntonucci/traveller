import Entity from '@shared/domain/Entity';
import Address from './Address';

export default class Place extends Entity {
  name: string;

  image?: string;

  description: string;

  categoryId: string;

  addressId: number;

  address?: Address;
}
