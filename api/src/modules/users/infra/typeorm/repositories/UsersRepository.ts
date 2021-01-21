import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import PaginationParams from '@shared/core/PaginationParams';
import ListResponse from '@shared/core/ListResponse';
import UserEntity from '../entities/UserEntity';

export default class UsersRepository implements IUsersRepository {
  private ormRepo: Repository<UserEntity>;

  constructor() {
    this.ormRepo = getRepository(UserEntity);
  }

  public async findById(id: string): Promise<UserEntity | undefined> {
    const user = await this.ormRepo.findOne({ id });

    return user;
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.ormRepo.findOne({ email });

    return user;
  }

  public async save(user: UserEntity): Promise<UserEntity> {
    return this.ormRepo.save(user);
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

  public async findAndCount({
    count,
    order,
    offset,
  }: PaginationParams): Promise<ListResponse<UserEntity>> {
    const [users, total] = await this.ormRepo.findAndCount({
      order: { createdAt: order },
      take: count,
      skip: offset,
    });

    return new ListResponse<UserEntity>({ data: users, total, count, offset });
  }

  public async delete(userId: string): Promise<number | null | undefined> {
    const result = await this.ormRepo.delete({ id: userId });

    return result.affected;
  }
}
