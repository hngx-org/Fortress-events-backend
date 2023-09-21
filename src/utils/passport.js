const { User } = require("../model");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');

passport.use(new GoogleStrategy({
    clientID:     process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;