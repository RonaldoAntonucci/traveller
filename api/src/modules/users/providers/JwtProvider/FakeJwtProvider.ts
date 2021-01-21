import IJwtProvider from './IJwtProvider';

type T = string | Record<string, unknown>;

export default class FakeJwtProvider implements IJwtProvider {
  public sign(): string {
    return Math.random().toString();
  }

  public verify<K extends T>(token: string): K {
    return token as K;
  }
}
