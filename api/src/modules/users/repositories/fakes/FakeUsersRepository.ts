import User from '@modules/users/domain/User';
import ICreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository implements IUsersRepository {
  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = new User();

    user.email = email;

    return user;
  }
}
