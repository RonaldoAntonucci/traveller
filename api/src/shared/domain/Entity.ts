interface IEntityProps {
  id?: string | number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Entity implements IEntityProps {
  id?: string | number;

  createdAt?: Date;

  updatedAt?: Date;
}
