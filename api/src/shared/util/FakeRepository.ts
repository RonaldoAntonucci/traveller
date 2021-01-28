import IRepository from '@shared/core/IRepository';
import ListResponse from '@shared/core/ListResponse';
import PaginationParams from '@shared/core/PaginationParams';
import Entity from '@shared/domain/Entity';
import { ClassConstructor } from 'class-transformer';

export default class FakeRepository<E extends Entity>
  implements IRepository<E> {
  constructor(private Ent: ClassConstructor<E>) {}

  public async create(data: unknown): Promise<E> {
    const e = new this.Ent();

    Object.assign(e, data);

    return e as E;
  }

  public async findById(id: string): Promise<E | undefined> {
    const e = new this.Ent();
    e.id = id;
    return e as E;
  }

  public async findAndCount({
    count,
    offset,
  }: PaginationParams): Promise<ListResponse<E>> {
    const cities = [];

    for (let i = count; i > 0; i -= 1) {
      cities.push(new this.Ent() as E);
    }

    return new ListResponse<E>({
      data: cities,
      total: count + offset,
      count,
      offset,
    });
  }

  public async save(entity: E): Promise<E> {
    return entity;
  }

  public async delete(): Promise<number | null | undefined> {
    return 1;
  }
}
