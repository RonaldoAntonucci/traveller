import User from '@modules/users/domain/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IService from '@shared/core/IService';
import PaginationParams from '@shared/core/PaginationParams';
import { inject, injectable } from 'tsyringe';
import ListResponse from '@shared/core/ListResponse';
import InvalidParamsError from './InvalidParamsError';

type IRequestDTO = PaginationParams;

type IResponse = ListResponse<User>;

@injectable()
export default class ListUsersService
  implements IService<IRequestDTO, IResponse> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(paginationParams: PaginationParams): Promise<IResponse> {
    if (!(paginationParams instanceof PaginationParams)) {
      throw new InvalidParamsError();
    }

    return this.usersRepository.findAndCount(paginationParams);
  }
}
