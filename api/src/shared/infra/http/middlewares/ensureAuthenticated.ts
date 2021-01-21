import IJwtProvider from '@modules/users/providers/JwtProvider/IJwtProvider';
import AppError from '@shared/core/AppError';
import InvalidJwtError from '@shared/core/InvalidJwtError';
import JwtMissingError from '@shared/core/JwtMissingError';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

interface ITokenPayload extends Record<string, unknown> {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

// interface IAuthOptions {
//   role?: string;
// }

export default () => (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JwtMissingError();
  }

  const [, token] = authHeader.split(' ');

  try {
    const JwtProvider = container.resolve<IJwtProvider>('JwtProvider');
    const decoded = JwtProvider.verify<ITokenPayload>(token);

    const { sub } = decoded;

    // if (opts.role && opts.role !== role) {
    //   throw new AppError('User without permission.', 401);
    // }

    request.user = {
      id: sub,
    };

    return next();
  } catch (e) {
    if (e instanceof AppError) {
      throw e;
    }

    throw new InvalidJwtError();
  }
};
