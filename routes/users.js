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
};

exports.createUser = function(req, res) {
	
};