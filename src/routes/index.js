const express = require("express");
const router = express.Router()
const { User } = require("../model/index")
const isLoggedIn = require("../middlewares/isLoggedIn")
const passport = require("passport")


router.get('/signup',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { successRedirect:'/profile' ,failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/login',(req,res)=>{
    res.send("something went wrong, log in again")
})


router.get('/profile',isLoggedIn, async (req,res)=>{
  const user = await User.findAll({
    where: {
      email: req.user.email
    }
  })
  res.status(200).send(user)
    
})

module.exports = router