import ListResponse from '@shared/core/ListResponse';
import PaginationParams from '@shared/core/PaginationParams';
import User from '../domain/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;

  findAndCount(data: PaginationParams): Promise<ListResponse<User>>;

  findById(id: string): Promise<User | undefined>;

  save(user: User): Promise<User>;

  delete(userId: string): Promise<number | null | undefined>;
}
