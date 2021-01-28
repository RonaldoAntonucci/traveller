import Category from '../Category';

export default (attr: Partial<Category> = {}): Category => {
  return {
    name: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ''),
    ...attr,
  };
};
