var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure,
	server = new Server('localhost', 27017, { auto_reconnect: true}),
	db = new Db('dressforsuccess', server);

db.open(function err, db) {
	if (!err) {
		console.log("Connected to 'dressforsuccess'");
	}
}

exports.findById = function(req, res) {
	res.send({
		id: req.params.id,
		name: "Test"
	});
};

exports.findAll = function(req, res) {
	res.send('User list goes here');
	db.collection('users', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.createUser = function(req, res) {
	var user = req.body;
	console.log('adding: ' + JSON.stringify(user));
	db.collection('users', function(err, collection) {
		db.collection.insert(user, { safe: true }, function(err, results) {
			if (err) {
				console.log('error adding user: ' + JSON.stringify(err));
			} else {
				console.log('added user: ' + JSON.stringify(results));
				res.send(result[0]);
		});
	});
};