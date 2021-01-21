import { inject, injectable } from 'tsyringe';

import User from '@modules/users/domain/User';
import ICreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import IService from '@shared/core/IService';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import { EmailAlreadyExistsError } from '@modules/users/errors/service';

@injectable()
export default class CreateUserService
  implements IService<ICreateUserDTO, User> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
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

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}
