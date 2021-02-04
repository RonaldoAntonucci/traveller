import Place from '../Place';
import FakeAddress from './FakeAddress';

export default (attr: Partial<Place> = {}): Place => {
  const address = FakeAddress();
  address.id = Math.random();
  return {
    name: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ''),
    description: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ''),
    image: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ''),
    addressId: address.id,
    categoryId: String(Math.random()),
    address,
    ...attr,
  };
};
