var express  = require('express'),
    PORT     = process.env.PORT || 3000,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname   = "vocabattle",
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts'),
    marked = require('marked'),
    session = require('express-session'),
    bcrypt = require('bcryptjs');

module.exports = function(){
  /* Create Server */
  var server = express();
  /* Constant Handlers */
  var config = require('../config/config.js');
  /* Constant Handlers END */
  /* middleware */
  server.set('views', './views');
  server.set('view engine', 'ejs');
  server.use(express.static('../public'));
  server.use(morgan('dev'));
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(methodOverride("_method"));
  server.use(expressLayouts);
  server.use(session({
    secret: 'vocabattler',
    resave: false,
    saveUninitialized: true,
  }));
  /* Custom Middleware */
  server.use(function (req, res, next) {
      res.locals.flash  = req.session.flash || {};
      req.session.flash = {};
      next();
  });
  server.use(function(req, res, next){
    if(req.session.user){
      res.locals.user = req.session.user;
    } else {
      res.locals.user = "derp";
    }
    next();
  });
  /* Custom Middleware End */
  return server;
};
