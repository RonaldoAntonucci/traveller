import Entity from '@shared/domain/Entity';

export default class User extends Entity {
  id?: string;

  name: string;

  email: string;

  password: string;
}
