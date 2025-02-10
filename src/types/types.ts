import type { Context } from 'hono';
import type { Profile } from 'passport';

export interface UserProfile extends Profile {
  id: string;
  emails?: Array<{ value: string; verified: boolean }>;
}

export interface AuthContext extends Context {
  user?: UserProfile;
  session: Record<string, any>;
}
