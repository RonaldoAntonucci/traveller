import 'reflect-metadata';

import FakeUser from '@modules/users/domain/fakes/FakeUser';
import User from '@modules/users/domain/User';
import FakeHashProvider from '@modules/users/providers/HashProvider/FakeHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UpdateUserService from '.';
import {
  EmailAlreadyExistsError,
  PasswordNoesNotMatchError,
  UserNotExistsError,
} from './UpdateUserErrors';

describe('Update User Service - unit', () => {
  let service: UpdateUserService;
  let usersRepo: IUsersRepository;
  let hashProvider: IHashProvider;

  let checkUser: jest.SpyInstance;
  let checkEmail: jest.SpyInstance;
  let checkOldPassword: jest.SpyInstance;
  let checkHashNewPassword: jest.SpyInstance;
  let checkUserUpdate: jest.SpyInstance;

  beforeEach(() => {
    usersRepo = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new UpdateUserService(usersRepo, hashProvider);

    checkUser = jest.spyOn(usersRepo, 'findById');
    checkEmail = jest.spyOn(usersRepo, 'findByEmail');
    checkOldPassword = jest.spyOn(hashProvider, 'compareHash');
    checkHashNewPassword = jest.spyOn(hashProvider, 'generateHash');
    checkUserUpdate = jest.spyOn(usersRepo, 'save');
  });

  it('should be able to update the profile(name, email, password)', async () => {
    /**
     * validar o usuário
     * validar o email
     * validar o old password
     * gerar o hash do novo password
     * atualizar o usuário
     */

    const userAttrs = FakeUser();
    const oldPassword = 'oldPassword';
    const hashedOldPassword = 'hashedOldPassword';

    checkUser.mockImplementationOnce(() => {
      const user = new User();
      user.password = hashedOldPassword;
      return user;
    });

    checkEmail.mockImplementationOnce(async () => undefined);
    checkOldPassword.mockImplementationOnce(() => true);
    checkHashNewPassword.mockImplementationOnce(async (pass) => pass);

    const updatedUser = await service.execute({
      ...userAttrs,
      userId: 'fakeId',
      oldPassword,
    });

    expect(updatedUser).toEqual(userAttrs);

    expect(checkUser).toBeCalledWith('fakeId');
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkOldPassword).toBeCalledWith(oldPassword, hashedOldPassword);
    expect(checkHashNewPassword).toBeCalledWith(userAttrs.password);
    expect(checkUserUpdate).toBeCalledWith(userAttrs);
  });

  it('should not be able to update user without valid Userid.', async () => {
    const userAttrs = FakeUser();

    checkUser.mockImplementationOnce(() => undefined);

    await expect(
      service.execute({ ...userAttrs, userId: 'fakeId' }),
    ).rejects.toEqual(new UserNotExistsError('fakeId'));

    expect(checkEmail).not.toBeCalled();
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should not be able to change to another user email if new email is already in use.', async () => {
    const userAttrs = FakeUser();
    userAttrs.id = 'fakeId';

    const oldPassword = '123456';

    checkUser.mockImplementationOnce(async () => new User());
    checkEmail.mockImplementationOnce(async () => new User());

    await expect(
      service.execute({
        ...userAttrs,
        userId: 'fakeId',
        oldPassword,
      }),
    ).rejects.toEqual(new EmailAlreadyExistsError(userAttrs.email));

    expect(checkUser).toBeCalledWith('fakeId');
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should not be able to update the password without old password.', async () => {
    const userAttrs = FakeUser();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => new User());
    checkEmail.mockImplementationOnce(async () => undefined);

    await expect(
      service.execute({
        ...userAttrs,
        userId: 'fakeId',
      }),
    ).rejects.toEqual(new PasswordNoesNotMatchError());

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should not be able to update the password with wrong old password.', async () => {
    const userAttrs = FakeUser();
    userAttrs.id = 'fakeId';

    const oldPassword = '123456';
    const hashedOldPassword = 'hashedOldPassword';

    checkUser.mockImplementationOnce(() => {
      const user = new User();
      Object.assign(user, userAttrs);
      user.password = hashedOldPassword;
      return user;
    });
    checkEmail.mockImplementationOnce(async () => undefined);
    checkOldPassword.mockImplementationOnce(async () => false);

    await expect(
      service.execute({
        ...userAttrs,
        userId: 'fakeId',
        oldPassword,
      }),
    ).rejects.toEqual(new PasswordNoesNotMatchError());

    expect(checkUser).toBeCalledWith('fakeId');
    expect(checkEmail).toBeCalledWith(userAttrs.email);
    expect(checkOldPassword).toBeCalledWith(oldPassword, hashedOldPassword);
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).not.toBeCalled();
  });

  it('should be able to updated profile without email and password.', async () => {
    const userAttrs = FakeUser();
    userAttrs.id = 'fakeId';

    checkUser.mockImplementationOnce(async () => {
      const user = new User();
      Object.assign(user, userAttrs);
      user.name = 'otherName';
      return user;
    });

    const updatedUser = await service.execute({
      name: userAttrs.name,
      userId: userAttrs.id,
    });

    expect(updatedUser).toEqual(userAttrs);

    expect(checkUser).toBeCalledWith(userAttrs.id);
    expect(checkEmail).not.toBeCalled();
    expect(checkOldPassword).not.toBeCalled();
    expect(checkHashNewPassword).not.toBeCalled();
    expect(checkUserUpdate).toBeCalledWith(userAttrs);
  });
});
