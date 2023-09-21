const { User } = require("../model");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');


// Serialize the user to the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});

passport.use(new GoogleStrategy({
    clientID:     process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        where: { email: profile.emails[0].value },
        defaults: {         
            name: profile.displayName,    
            avatar: profile.photos[0].value 
        }
    })
        .then(([user, created]) => done(null, user))
        .catch(err => done(err, null));
  }
));

module.exports = passport;