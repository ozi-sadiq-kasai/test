const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy:true
    },

    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleUserID: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleUserID: profile.id,
            googleUserName: profile.name.givenName,
          })
            .save()
            .then((user) => done(null, user));
        } //opportunity to take the accessToken identifying the user and store in the database
      });
    }
  )
);
