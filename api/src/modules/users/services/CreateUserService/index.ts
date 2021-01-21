import { inject, injectable } from 'tsyringe';

import User from '@modules/users/domain/User';
import ICreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import IService from '@shared/core/IService';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { EmailAlreadyExistsError } from './CreateUserErrors';

@injectable()
export default class CreateUserService
  implements IService<ICreateUserDTO, User> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new EmailAlreadyExistsError(email);
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password,
    });

    return user;
  }
}
