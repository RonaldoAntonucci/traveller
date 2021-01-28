import IRepository from '@shared/core/IRepository';
import Category from '../domain/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

export default interface ICategoriesRepository extends IRepository<Category> {
  create(data: ICreateCategoryDTO): Promise<Category>;

  findByName(name: string): Promise<undefined | Category>;

  count(): Promise<number>;
}
