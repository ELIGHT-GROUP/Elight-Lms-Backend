import type { Context, Next } from 'hono';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ['profile', 'email'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        // Here you would typically:
        // 1. Check if user exists in your database
        // 2. Create user if they don't exist
        // 3. Update user's information if needed
        // For this example, we'll just pass the profile
        return done(null, profile);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

passport.serializeUser(
  (user: Express.User, done: (err: any, id?: any) => void) => {
    done(null, user);
  }
);

passport.deserializeUser(
  (obj: Express.User, done: (err: any, user?: any) => void) => {
    done(null, obj);
  }
);

export const passportMiddleware = (c: Context, next: Next) => {
  return new Promise<void>((resolve, reject) => {
    passport.initialize()(c.req.raw as any, c.res as any, (err?: any) => {
      if (err) reject(err);
      else resolve();
    });
  }).then(() => next());
};
