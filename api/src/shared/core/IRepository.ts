import Entity from '@shared/domain/Entity';
import ListResponse from './ListResponse';
import PaginationParams from './PaginationParams';

export default interface IRepository<E extends Entity> {
  create(data: unknown): Promise<E>;

  findById(id: string): Promise<E | undefined>;

  findAndCount(data: PaginationParams): Promise<ListResponse<E>>;

  delete(id: string): Promise<number | null | undefined>;

  save(entity: E): Promise<E>;
}
