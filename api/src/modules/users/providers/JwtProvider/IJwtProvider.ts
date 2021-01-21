export interface ISignInDTO {
  payload?: string | Record<string, unknown> | Buffer;
  subject: string;
}

type T = string | Record<string, unknown>;

export default interface IJwtProvider {
  sign(data: ISignInDTO): string;

  verify<K extends T>(token: string): K;
}
