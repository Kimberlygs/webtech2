/*
 * GET home page.
 */
exports.index = function(req, res){

	connection.query("use webtech");
 	var strQuery = "select * from login";
  	console.log(strQuery); 
  connection.query(strQuery, function(err, rows){
  	if(err)	{
  		throw err;
  	}else{
  		console.log( rows );
  	}
  });
  	res.render('questions', { title: 'all questions',messages:strQuery});
};