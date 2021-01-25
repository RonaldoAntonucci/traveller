import Entity from '@shared/domain/Entity';

export default class User extends Entity {
  name: string;

  email: string;

  password: string;
}
