interface IEntityProps {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Entity implements IEntityProps {
  id?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
