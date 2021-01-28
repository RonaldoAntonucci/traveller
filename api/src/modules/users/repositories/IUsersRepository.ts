import IRepository from '@shared/core/IRepository';
import User from '../domain/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository extends IRepository<User> {
  create(data: ICreateUserDTO): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;
}
