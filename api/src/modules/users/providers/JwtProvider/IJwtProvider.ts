export interface ISignDTO {
  payload?: string | Record<string, unknown> | Buffer;
  subject: string;
}

type T = string | Record<string, unknown>;

export default interface IJwtProvider {
  sign(data: ISignDTO): string;

  verify<K extends T>(token: string): K;
}
