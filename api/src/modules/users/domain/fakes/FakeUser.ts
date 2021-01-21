import User from '../User';

export default (attrs: Partial<User> = {}): User => {
  return {
    name: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, ''),
    email: `${Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')}@email.com`,
    password: Math.random().toString(16),
    ...attrs,
  };
};
