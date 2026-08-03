import * as jwt from 'jsonwebtoken';

export function verifyAccessToken(token: string, secret: string) {
  return jwt.verify(token, secret);
}
