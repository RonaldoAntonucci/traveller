import { inject, injectable } from 'tsyringe';

import User from '@modules/users/domain/User';
import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IService from '@shared/core/IService';
import {
  EmailAlreadyExistsError,
  OldPasswordIsRequiredError,
  PasswordNoesNotMatchError,
  UserNotExistsError,
} from '@modules/users/errors/service';

interface IRequestDTO extends Partial<User> {
  userId: string;
  oldPassword?: string;
}

type IResponse = User;

@injectable()
export default class UpdateUserService
  implements IService<IRequestDTO, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    email,
    name,
    password,
    oldPassword,
  }: IRequestDTO): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotExistsError(userId);
    }

    if (email) {
      const emailExists = await this.usersRepository.findByEmail(email);

      if (emailExists) {
        throw new EmailAlreadyExistsError(email);
      }

      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      if (!oldPassword) {
        throw new OldPasswordIsRequiredError();
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new PasswordNoesNotMatchError();
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
