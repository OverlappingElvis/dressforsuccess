var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('dressforsuccess', server);

db.open(function(err, db) {
	if (!err) {
	}
});

exports.findById = function(req, res) {
	res.send({
		id: req.params.id
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
	// console.log('adding: ' + JSON.stringify(user));
	console.log(user);
	db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};