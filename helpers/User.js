'use strict'

module.exports = function(){
  return {
    SignUpValidator:(req,res,next)=>{
      req.checkBody('username','Username is required').notEmpty();
      req.checkBody('username','Username must not be less than 5').isLength({min:5});
      req.checkBody('email','Email is required').notEmpty();
      req.checkBody('email','Email is not valid').notEmpty();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('password','password must be not less than 5').isLength({min:5});

      req.getValidationResult()
          .then((result)=>{
              const errors = result.array();
              const messages = [];
              errors.forEach((error) => {
               messages.push(error.msg);
              });

              req.flash('error',messages);
              res.redirect('/signup');
          })
          .catch((error)=>{
              return next();
          })
    },

    LoginValidator:(req,res,next)=>{
      req.checkBody('email','Email is required').notEmpty();
      req.checkBody('email','Email is not valid').notEmpty();
      req.checkBody('password','Password is required').notEmpty();
      req.checkBody('password','password must be not less than 5').isLength({min:5});

      req.getValidationResult()
          .then((result)=>{
              const errors = result.array();
              const messages = [];
              errors.forEach((error) => {
               messages.push(error.msg);
              });

              req.flash('error',messages);
              res.redirect('/signup');
          })
          .catch((error)=>{
              return next();
          })
    }
  }
}