import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserEntity from '../entities/UserEntity';

export default class UsersRepository implements IUsersRepository {
  private ormRepo: Repository<UserEntity>;

  constructor() {
    this.ormRepo = getRepository(UserEntity);
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.ormRepo.findOne({ email });

    return user;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<UserEntity> {
    const user = this.ormRepo.create({
      email,
      name,
      password,
    });

    await this.ormRepo.save(user);

    return user;
  }
}
