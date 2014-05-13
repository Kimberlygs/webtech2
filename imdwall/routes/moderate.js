/*
 * GET moderate listing.
 */

exports.index = function(req, res){
	res.render('moderate', { title: 'Moderator page' });
};