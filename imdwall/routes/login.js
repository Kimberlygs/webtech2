/*
 * GET login page.
 */
exports.index = function(req, res){

	var username = req.body.username;
	var password = req.body.password;
	connection.query("use webtech");
 	var strQuery = "SELECT * FROM loginuser WHERE user_name = '" + username + "' AND user_password = '" + password + "'";
  	console.log(strQuery); 
  connection.query(strQuery, function(err, rows){
  	if(err)	{
  		throw err;
  	}else{
  		console.log( rows );
  		if(strQuery){
  			  res.redirect('ask');
  		}else{
  			  res.redirect('questions');
  		}
  	}
  });
  	res.render('login', { title: 'Login to make changes',login:strQuery});
};