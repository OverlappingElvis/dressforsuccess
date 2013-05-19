// ADMIN CONTROLLER ... for managing the client profiles

// create
exports.showCreate = function(req, res) {
	//res.send('events.findAll test');
	var id = 0;
	res.render('signup.html', {title: 'Create a Client Account'});
};

// list
exports.list = function(req, res) {
  // this is a page that will need some type of auth, since only
  // dress for success staff should have access to create a profile
  res.render('adminlist.html', {title: 'List Clients'});
}

// edit
exports.showEdit = function(req, res) {
  // this is a page that will need some type of auth, since only
  // dress for success staff should have access to create a profile
  var id = req.param.id;
  res.render('signup.html', {title: 'Edit a Client Account'});
}
