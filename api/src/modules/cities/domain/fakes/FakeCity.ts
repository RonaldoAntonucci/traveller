import City from '../City';

export default (attr: Partial<City> = {}): City => {
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
    ...attr,
  };
};
