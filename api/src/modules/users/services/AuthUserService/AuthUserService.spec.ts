import 'reflect-metadata';

import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import IJwtProvider from '@modules/users/providers/JwtProvider/IJwtProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/FakeHashProvider';
import FakeJwtProvider from '@modules/users/providers/JwtProvider/FakeJwtProvider';
import FakeUser from '@modules/users/domain/fakes/FakeUser';
import User from '@modules/users/domain/User';
import EmailAndPasswordError from '@modules/users/errors/service/EmailAndPasswordError';
import AuthUserService from '.';

describe('AuthenticateUserService - unit', () => {
  let service: AuthUserService;
  let usersRepo: IUsersRepository;
  let hashProvider: IHashProvider;
  let jwtProvider: IJwtProvider;

  let checkUser: jest.SpyInstance;
  let checkPassword: jest.SpyInstance;
  let checkGenerateJwt: jest.SpyInstance;

  beforeEach(() => {
    usersRepo = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    jwtProvider = new FakeJwtProvider();
    service = new AuthUserService(usersRepo, hashProvider, jwtProvider);

    checkUser = jest.spyOn(usersRepo, 'findByEmail');
    checkPassword = jest.spyOn(hashProvider, 'compareHash');
    checkGenerateJwt = jest.spyOn(jwtProvider, 'sign');
  });

  it('should be able to Authenticate.', async () => {
    const userAttrs = FakeUser();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => {
      const user = new User();
      Object.assign(user, userAttrs);
      user.password = 'hashedPassword';

      return user;
    });
    checkPassword.mockImplementationOnce(async () => true);

    const auth = await service.execute({
      email: userAttrs.email,
      password: userAttrs.password,
    });

    expect(auth).toHaveProperty('token');
    expect(auth).toHaveProperty('user');
    expect(checkPassword).toHaveBeenCalledWith(
      userAttrs.password,
      'hashedPassword',
    );
    expect(checkGenerateJwt).toHaveBeenCalledWith({
      subject: userAttrs.id,
      payload: {},
    });
  });

  it('should not be able to Authenticate with wrong email.', async () => {
    const userAttrs = FakeUser();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => undefined);

    await expect(
      service.execute({
        email: userAttrs.email,
        password: userAttrs.password,
      }),
    ).rejects.toEqual(new EmailAndPasswordError());

    expect(checkPassword).not.toHaveBeenCalled();
    expect(checkGenerateJwt).not.toHaveBeenCalled();
  });

  it('should not be able to Authenticate with wrong password.', async () => {
    const userAttrs = FakeUser();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => {
      const user = new User();
      Object.assign(user, userAttrs);
      user.password = 'hashedPassword';

      return user;
    });
    checkPassword.mockImplementationOnce(async () => false);

    await expect(
      service.execute({
        email: userAttrs.email,
        password: userAttrs.password,
      }),
    ).rejects.toEqual(new EmailAndPasswordError());

    expect(checkPassword).toHaveBeenCalledWith(
      userAttrs.password,
      'hashedPassword',
    );
    expect(checkGenerateJwt).not.toHaveBeenCalled();
  });
});
