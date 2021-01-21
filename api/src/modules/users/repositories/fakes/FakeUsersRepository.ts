import User from '@modules/users/domain/User';
import ICreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import ListResponse from '@shared/core/ListResponse';
import PaginationParams from '@shared/core/PaginationParams';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = new User();
    user.id = id;
    return user;
  }

  public async save(user: User): Promise<User> {
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = new User();

    user.email = email;

    return user;
  }

  public async findAndCount({
    count,
    offset,
  }: PaginationParams): Promise<ListResponse<User>> {
    const users = [];

    for (let i = count; i > 0; i -= 1) {
      users.push(new User());
    }

    return new ListResponse<User>({
      data: users,
      total: count + offset,
      count,
      offset,
    });
  }
}
