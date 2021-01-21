export interface IUserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export default class User implements IUserProps {
  id?: string;

  name: string;

  email: string;

  password: string;

  updatedAt?: Date;

  createdAt?: Date;
}
