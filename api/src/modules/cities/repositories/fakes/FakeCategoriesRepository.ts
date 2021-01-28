import Category from '@modules/cities/domain/Category';
import FakeRepository from '@shared/util/FakeRepository';
import ICategoriesRepository from '../ICategoriesRepository';

export default class FakeCategoriesRepository
  extends FakeRepository<Category>
  implements ICategoriesRepository {
  constructor() {
    super(Category);
  }

  public async findByName(name: string): Promise<undefined | Category> {
    const category = new Category();
    category.name = name;

    return category;
  }

  public async count(): Promise<number> {
    return 0;
  }
}
