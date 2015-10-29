var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database
var mongoose = require('mongoose');
var Collaborateur= require('./models/collaborateurs.js').Collaborateur;



var app = express();


// Connect to mongodb
// conncertion à une base de donnée mongoDB local
  mongoose.connect('mongodb://localhost/dbGestionPersonel');

// connection base de donnée mongolab
// mongoose.connect('mongodb://maroua:maroua@ds037601.mongolab.com:37601/nosqlblog');


//variable qui permettre d'acceder au contenu de la base des données
var db = mongoose.connection;
 // fonction test connection
db.on('error', function(){
  console.log('WARNING! ******DB connection error******')
});
db.on('open', function(){
  console.log('*********** DB connection OK ! ******')
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Site attributes
app.locals.site = {
  title: "GestionPersonel"
};

// Parser
app.use(bodyParser.json()); // for parsing application/json

// Routes
var routes = require('./routes/index');
app.use('/', routes);
 
//collaborateurs
var collaborateurs = require('./routes/collaborateurs');
app.use('/collaborateurs', collaborateurs);

//collaborateur
var collaborateur = require('./routes/list');
app.use('/collaborateurs', collaborateur);

//liste collaborateur suppriméé
var collaborateur = require('./routes/listSupprimer');
app.use('/anciencollaborateurs', collaborateur);

//statistique
var statistiques = require('./routes/statistiques');
app.use('/statistiques',statistiques);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;

