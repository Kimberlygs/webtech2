
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

});



app.get('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  connection.query("use webtech");
  var strQuery = "SELECT * FROM loginuser WHERE user_name = '" + username + "' AND user_password = '" + password + "'";
    console.log(strQuery); 
  connection.query(strQuery, function(err, rows){
    if(err) {
      throw err;
    }else{
      console.log( rows );
      if(strQuery){
          res.redirect('ask.jade');
      }else{
          res.redirect('questions.jade');
      }
    }
  });

});

// begin get all question
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
  		result = rows;
  		res.render('questions', { title: 'all questions',messages:result});
  	}
 	 });
  	console.log(result);
  	var insertQuery = JSON.stringify(strQuery);
  	
});// einde get all questions

// begin get all question on ask page
app.get('/ask', function(req, res){


  connection.query("use webtech");
  var strQuery = "select * from login";
  var result = "";
    //console.log(strQuery); 
  connection.query(strQuery, function(err, rows){
    if(err) {
      throw err;
    }else{
      console.log( rows );
      console.log("jess");
      result = rows;
      res.render('ask', { title: 'All question on ask page',messages:result});
    }
   });
    console.log(result);
    console.log("niet jess");
    var insertQuery = JSON.stringify(strQuery);
    
});// einde get all questions on ask page

app.get('/moderate',moderate.index);


// begin insertData
app.post('/insertData',function(req,res){

	var name = req.body.name;
	var question = req.body.question;

	connection.query("use webtech");
 	var strQuery = "insert into login (name, message) values ('"+ name + "','"+ question + "')";	
  	console.log(strQuery);
  connection.query( strQuery, function(err, rows){
  		if (!err) 
            {
               res.send(JSON.stringify(true));

            } 
            else 
            {
              console.log(err);
              res.send(JSON.stringify(false));
            }
  });

});// einde insert data

// begin delete
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

});// einde delete


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

var bayeux = new faye.NodeAdapter({mount: '/faye'});

bayeux.attach(server);
server.listen('8000');

});
