import User from '@modules/users/domain/User';
import FakeRepository from '@shared/util/FakeRepository';
import IUsersRepository from '../IUsersRepository';

export default class FakeUsersRepository
  extends FakeRepository<User>
  implements IUsersRepository {
  constructor() {
    super(User);
  }

  public async findByEmail(email: string): Promise<User> {
    const user = new User();

    user.email = email;

    return user;
  }
}
