const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('flash');
const passport = require('passport');

const container = require('./container');

container.resolve(function(users,_,admin){

  mongoose.promise = global.Promise;
  mongoose.connect('mongodb://localhost/football',{useMongoClient : true});

    const app = SetupExpress();

    function SetupExpress(){
      const app = express();
      const server = http.createServer(app);
      server.listen(3000,function(){
        console.log('listening on port 3000');
      });

      ConfigureExpress(app);
 
      //Setup router
      const router = require('express-promise-router')();
      users.SetRouting(router);
      admin.SetRouting(router);
      app.use(router);
    }

    function ConfigureExpress(app){

      require('./passport/passport-local.js');
      require('./passport/passport-facebook.js');
      require('./passport/passport-google.js');
      app.use(express.static('public'));
      app.set('view engine','ejs');
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended:true}));
      app.use(cookieParser());
      app.use(validator());
      app.use(session({
        secret: 'thisisasecretkey',
        resave:true,
        saveInitialized :true,
        store : new MongoStore({mongooseConnection: mongoose.connection})
      }));

      app.use(flash());

      app.use(passport.initialize());
      app.use(passport.session()); 

      app.locals._ = _;
    }

});
