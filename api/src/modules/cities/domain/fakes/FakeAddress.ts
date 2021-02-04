import Address from '../Address';

export default (attr: Partial<Address> = {}): Address => {
  return {
    zipCode: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ''),
    street: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ''),
    neighborhood: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ''),
    number: Math.random().toString(),
    ...attr,
  };
};
