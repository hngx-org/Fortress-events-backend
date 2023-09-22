const { User } = require("../model");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");

require("dotenv").config();

process.env.PORT = 3000;
process.env.HOST = "ec2-18-119-101-235.us-east-2.compute.amazonaws.com";
process.env.apiKey = "AIzaSyDaH73jrUPJoHAijy8As0cr7uaJ_5vWUcU";
process.env.clientID =
  "755571065048-a7mp6k0ofsdb73u4398lioa9a2ft43eq.apps.googleusercontent.com";
process.env.clientSecret = "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";

// Serialize the user to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: `http://ec2-18-119-101-235.us-east-2.compute.amazonaws.com:3000/auth/google/callback`,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        where: { email: profile.emails[0].value },
        defaults: {
          name: profile.displayName,
          avatar: profile.photos[0].value,
        },
      })
        .then(([user, created]) => done(null, user))
        .catch((err) => done(err, null));
    }
  )
);

module.exports = passport;
