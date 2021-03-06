'use strict';
const passport = require('passport');

module.exports = function(_,User){

  return {
     SetRouting : function(router){
      router.get('/',this.indexPage);
      router.get('/signup',this.getSignUp);
      router.post('/signup',User.SignUpValidator,this.postSignUp);
      router.get('/home',this.homePage);
      router.post('/',User.LoginValidator,this.postLogin);
      router.get('/auth/facebook',this.getFacebookLogin);
      router.get('/auth/facebook/callback',this.facebookLogin);
      router.get('/auth/google',this.getGoogleLogin);
      router.get('/auth/google/callback',this.googleLogin);
    },

     indexPage : function(req,res){
      const errors = req.flash('error');
     return res.render('index',{title:'football | login',messages : errors,hasErrors: errors.length > 0});
    },

    postLogin: passport.authenticate('local.login',{
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    }),

    getSignUp: function(req,res){ 
      const errors = req.flash('error');
      return res.render('signup',{title:'football | SignUp',messages : errors,hasErrors: errors.length > 0});
    },

    postSignUp: passport.authenticate('local.signup',{
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }),

    getFacebookLogin: passport.authenticate('facebook',{
      scope:'email'
    }),

    facebookLogin: passport.authenticate('facebook',{
      successRedrect: '/home',
      failureRedirect:'/signup',
      failureFlash:true
    }),

    getGoogleLogin: passport.authenticate('google',{
      scope:['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/plus.profile.emails.read']
    }),

    googleLogin: passport.authenticate('google',{
      successRedrect: '/home',
      failureRedirect:'/signup',
      failureFlash:true
    }),
    homePage : function(req,res){
      return res.render('home');
    }
  }
}