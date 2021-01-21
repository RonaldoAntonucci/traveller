import { UserNotExistsError } from '@modules/users/errors/service';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  userId: string;
}

type IResponse = number;

@injectable()
export default class DeleteUserService
  implements IService<IRequest, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<IResponse> {
    const deleteResult = await this.usersRepository.delete(userId);

    if (!deleteResult) {
      throw new UserNotExistsError(userId);
    }

    return deleteResult;
  }
}
