// ADMIN CONTROLLER ... for managing the client profiles
var mongo = require('mongodb'),
	Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    server = new Server('localhost', 27017, {auto_reconnect: true, w: 1}),
    db = new Db('dressforsuccess', server),
    account = require('../lib/account');
db.open(function(err, db) {
	if (!err) {
	}
});

// create
exports.showCreate = function(req, res) {
	//res.send('events.findAll test');
	var id = 0;
	var username = "";
	var name = "";
	var email = "";
	var phone = "";
	res.render('signup.html', {title: 'Create a Client Account', id: 0, username: '', name: '', email: '', phone: ''});
};

// list
exports.list = function(req, res) {
  // this is a page that will need some type of auth, since only
  // dress for success staff should have access to create a profile
	db.collection('accounts', function(err, collection) {
		collection.find().toArray(function(err, items) {
			//res.send(items);
			res.render('adminlist.html', {title: 'List Clients', users: items});
		});
	});
}

// edit
exports.showEdit = function(req, res) {
  // this is a page that will need some type of auth, since only
  // dress for success staff should have access to create a profile
	var id = req.params.id;
	db.collection('accounts', function(err, collection) {
		collection.findOne({ '_id': new BSON.ObjectID(id) }, function(err, item) {
			//res.send(item);
			res.render('signup.html', {title: 'Edit a Client Account', id: req.params.id, username: item.user, name: item.name, email: item.email, phone: item.phone});
		});
	});
}
