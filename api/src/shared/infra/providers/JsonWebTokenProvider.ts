import JsonWebToken from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import IJwtProvider, {
  ISignInDTO,
} from '@modules/users/providers/JwtProvider/IJwtProvider';
import auth from '@config/auth';

type T = string | Record<string, unknown>;

@injectable()
export default class JsonWebTokenProvider implements IJwtProvider {
  private jwt = JsonWebToken;

  private config: typeof auth;

  constructor() {
    this.config = auth;
  }

  sign({ payload = {}, subject }: ISignInDTO): string {
    const { secret, expiresIn } = this.config.jwt;

    const token = this.jwt.sign(payload, secret, { subject, expiresIn });

    return token;
  }

  verify<K extends T>(token: string): K {
    const decode = this.jwt.verify(token, this.config.jwt.secret);

    return decode as K;
  }
}
