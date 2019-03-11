let passport = require('passport');
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export function setup(User, config) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID || 'YOUR_GOOGLE_APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || '',
    callbackURL: `${process.env.DOMAIN || ''}/auth/google/callback`
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ 'google.id': profile.id }).exec()
        .then(user => {
          if (user) {
            return done(null, user);
          }

          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.emails[0].value.split('@')[0],
            avatar: profile.photos[0].value,
            provider: 'google',
            google: profile._json
          });
          user.save()
            .then(savedUser => done(null, savedUser))
            .catch(err => done(err));
        })
        .catch(err => done(err));
    }));
}
