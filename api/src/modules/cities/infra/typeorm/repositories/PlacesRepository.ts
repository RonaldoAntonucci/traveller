import ICreatePlaceDTO from '@modules/cities/dtos/ICreatePlaceDTO';
import IPlacesRepository from '@modules/cities/repositories/IPlacesRepository';
import ListResponse from '@shared/core/ListResponse';
import PaginationParams from '@shared/core/PaginationParams';
import { getConnection, getRepository, Repository } from 'typeorm';
import AddressEntity from '../entities/AddressEntity';
import PlaceEntity from '../entities/PlaceEntity';

export default class PlacesRepository implements IPlacesRepository {
  private ormRepo: Repository<PlaceEntity>;

  // private ormAddressRepo: Repository<AddressEntity>;

  constructor() {
    this.ormRepo = getRepository(PlaceEntity);
    // this.ormAddressRepo = getRepository(AddressEntity);
  }

  public async create({
    description,
    name,
    address: { neighborhood, street, zipCode, number },
    categoryId,
  }: ICreatePlaceDTO): Promise<PlaceEntity> {
    return getConnection().transaction(async (transaction) => {
      const placeRepo = transaction.getRepository(PlaceEntity);
      const addressRepo = transaction.getRepository(AddressEntity);

      const address = addressRepo.create({
        neighborhood,
        number,
        street,
        zipCode,
      });

      await addressRepo.save(address);

      const place = placeRepo.create({
        description,
        name,
        categoryId,
        address,
      });

      await placeRepo.save(place);

      return place;
    });
  }

  public async findById(id: string): Promise<PlaceEntity | undefined> {
    const place = await this.ormRepo.findOne({ id });

    return place;
  }

  public async findByName(name: string): Promise<PlaceEntity | undefined> {
    const place = await this.ormRepo.findOne({ name });

    return place;
  }

  public async findAndCount({
    count,
    order,
    offset,
  }: PaginationParams): Promise<ListResponse<PlaceEntity>> {
    const [places, total] = await this.ormRepo.findAndCount({
      order: { createdAt: order },
      take: count,
      skip: offset,
    });

    return new ListResponse<PlaceEntity>({
      data: places,
      total,
      count,
      offset,
    });
  }

  public async save(place: PlaceEntity): Promise<PlaceEntity> {
    return this.ormRepo.save(place);
  }

  public async delete(placeId: string): Promise<number | null | undefined> {
    const result = await this.ormRepo.delete({ id: placeId });

    return result.affected;
  }
}
