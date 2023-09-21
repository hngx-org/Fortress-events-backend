const passport = require('passport')
const dotenv = require('dotenv')
const {User} = require('../model/index')



dotenv.config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken, profile, cb) =>{
  // console.log(profile)
  if(profile){
    const [user, created] = await User.findOrCreate({
      where: {
        email: profile.emails[0].value
      },
      defaults:{
        name: profile.displayName,
        email:profile.emails[0].value,
        avatar:profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null
      }
    });

    if (created) {
      console.log('User created:', user.toJSON());
    } else {
      console.log('User already exists:', user.toJSON());
    }


    cb(null, user)
  }else{
    cb(null,false)
  }
}
));

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((user, done)=>{
    done(null, user)
})
 