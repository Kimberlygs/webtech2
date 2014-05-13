
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var user = require('./routes/user.js');
var allQuestion = require('./routes/allQuestion.js');
var ask = require('./routes/ask.js');
var login = require('./routes/login.js');
var moderate = require('./routes/moderate.js');
var mysql =  require('mysql');
var faye = require('faye');
var hash = require('./pass').hash;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


// connectie leggen met de databank
 var connection =  mysql.createConnection({
  	host : "localhost",
  	user : "school",
  	password: "temptest",
  	
  });
 connection.connect();

 
var app = express();

var app = module.exports = express();

// config

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middleware

app.use(bodyParser());
app.use(cookieParser('shhhh, very secret'));
app.use(session());

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// dummy database

var users = {
  tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

hash('foobar', function(err, salt, hash){
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});


// Authenticate using our plain-object database of doom!

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(new Error('cannot find user'));
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash(pass, user.salt, function(err, hash){
    if (err) return fn(err);
    if (hash == user.hash) return fn(null, user);
    fn(new Error('invalid password'));
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/ask');
  }
}


// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
 //routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/', function(req, res){
  res.redirect('login');
});

app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

app.get('/login', function(req, res){
  res.render('login');
});

app.get('/questions', function(req, res){


	connection.query("use webtech");
 	var strQuery = "select * from login";
 	var result = "";
  	//console.log(strQuery); 
  connection.query(strQuery, function(err, rows){
  	if(err)	{
  		throw err;
  	}else{
  		console.log( rows );
  		console.log("jess");
  		result = rows;
  		res.render('questions', { title: 'all questions',messages:result});
  	}
 	 });
  	console.log(result);
  	console.log("niet jess");
  	var insertQuery = JSON.stringify(strQuery);
  	
	});

app.get('/ask',ask.index);
app.get('/login',login.index);
app.get('/moderate',moderate.index);

app.post('/insertDate',function(req,res){

	var name = req.body.name;
	var question = req.body.question;

	connection.query("use webtech");
 	var strQuery = "insert into login (name, password) values ('"+ name + "','"+ question + "')";	
  	console.log(strQuery);
  connection.query( strQuery, function(err, rows){
  		if (!err) 
            {
              console.log("removed");
               res.send(JSON.stringify(true));

            } 
            else 
            {
              console.log(err);
              res.send(JSON.stringify(false));
            }
  });

});

app.post('/deleteDate/:id',function(req,res){

	var id = req.params.id;
	
	console.log(id);

	connection.query("use webtech");
 	var strQuery = "delete from login where id= " + id;	
  	console.log(strQuery);
  connection.query( strQuery, function(err, rows){
  	if (!err) 
            {
              console.log("removed");
               res.send(JSON.stringify(true));

            } 
            else 
            {
              console.log(err);
              res.send(JSON.stringify(false));
            }
  });

});

// inloggen
app.post('/login', function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('login');
    }
  });
});
// einde van inloggen
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

var bayeux = new faye.NodeAdapter({mount: '/faye'});

bayeux.attach(server);
server.listen('8000');

});
