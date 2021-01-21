import User from '@modules/users/domain/User';
import EmailAndPasswordError from '@modules/users/errors/service/EmailAndPasswordError';
import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import IJwtProvider from '@modules/users/providers/JwtProvider/IJwtProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: User;
}

@injectable()
export default class AuthUserService
  implements IService<IRequestDTO, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('JwtProvider')
    private jwtProvider: IJwtProvider,
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !user.id) {
      throw new EmailAndPasswordError();
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new EmailAndPasswordError();
    }

    const token = this.jwtProvider.sign({
      subject: user.id,
      payload: {},
    });

    return {
      token,
      user,
    };
  }
}
