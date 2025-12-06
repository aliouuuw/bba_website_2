// Shared authentication utilities for admin API routes

// Simple in-memory session tokens (cleared on server restart)
// In production, use a proper session store like Redis
export const activeSessions = new Set<string>();

export function generateToken(): string {
  return crypto.randomUUID();
}

export function verifyToken(token: string | null | undefined): boolean {
  if (!token) return false;
  return activeSessions.has(token);
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return null;
  return authHeader.replace("Bearer ", "");
}