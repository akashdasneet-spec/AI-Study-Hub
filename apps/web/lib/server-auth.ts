import { verifyAccessToken, TokenPayload } from '@hub/auth';

export function getAuthUser(request: Request): TokenPayload | null {
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!authHeader) return null;

  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return null;

  try {
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}
