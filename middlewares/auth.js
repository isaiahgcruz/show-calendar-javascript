const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '531939707305-tbvaemibt7lqm246tn9gmoaboqd32787.apps.googleusercontent.com',
    clientSecret: 'rxqcJo1EnAK_yvtsLJ131mSR',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          user = new User({ googleId: profile.id });
          user.save((err) => {
            if (err) {
              console.log(err);
            }
            return done(null, user);
          })
        } else {
          return done(null, user);
        }
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

module.exports = {
  passport,
  isAuthenticated,
};