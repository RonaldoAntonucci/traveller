import ICreateCategoryDTO from '@modules/cities/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import ListResponse from '@shared/core/ListResponse';
import PaginationParams from '@shared/core/PaginationParams';
import { getRepository, Repository } from 'typeorm';
import CategoryEntity from '../entities/CategoryEntity';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepo: Repository<CategoryEntity>;

  constructor() {
    this.ormRepo = getRepository(CategoryEntity);
  }

  public async create({ name }: ICreateCategoryDTO): Promise<CategoryEntity> {
    const category = this.ormRepo.create({ name });

    await this.ormRepo.save(category);

    return category;
  }

  public async findById(id: string): Promise<CategoryEntity | undefined> {
    return this.ormRepo.findOne({ id });
  }

  public async findByName(name: string): Promise<CategoryEntity | undefined> {
    const category = await this.ormRepo.findOne({ name });

    return category;
  }

  public async count(): Promise<number> {
    const count = this.ormRepo.count();

    return count;
  }

  public async findAndCount({
    count,
    order,
    offset,
  }: PaginationParams): Promise<ListResponse<CategoryEntity>> {
    const [categories, total] = await this.ormRepo.findAndCount({
      order: { createdAt: order },
      take: count,
      skip: offset,
    });

    return new ListResponse<CategoryEntity>({
      data: categories,
      total,
      count,
      offset,
    });
  }

  public async save(category: CategoryEntity): Promise<CategoryEntity> {
    return this.ormRepo.save(category);
  }

  public async delete(categoryId: string): Promise<number | null | undefined> {
    const result = await this.ormRepo.delete({ id: categoryId });

    return result.affected;
  }
}
