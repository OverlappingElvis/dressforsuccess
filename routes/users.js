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

exports.findById = function(req, res) {
	var id = req.params.id;
	db.collection('accounts', function(err, collection) {
		collection.findOne({ '_id': new BSON.ObjectID(id) }, function(err, item) {
			res.send(item);
		});
	});
};

exports.findAll = function(req, res) {
	db.collection('accounts', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.createUser = function(req, res) { 
	if( req.params.id ) {
		// we're doing an edit
	}else{
		account.addNewAccount({
			name: req.param('name'),
			user: req.param('user'),
			email: req.param('email'),
			phone: req.param('phone'),
			pass: req.param('password')
		}, function(e) {
			if (e) {
				res.send(e, 400);
			} else {
				res.redirect('/admin');
			}
		});
	}
};

exports.login = function(req, res) {
	account.manualLogin(req.user, req.pass, function(result) {
		!!result && res.redirect('/');
	})
}