import User from '../domain/user';
import ICreateUserDTO from '../dtos/CreateUserDTO';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;
}
