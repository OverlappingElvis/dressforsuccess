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
	var id = req.params.id;
	db.collection('users', function(err, collection) {
		collection.findOne({ '_id': new BSON.ObjectID(id) }, function(err, item) {
			res.send(item);
		});
	});
};

exports.findAll = function(req, res) {
	db.collection('users', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.createUser = function(req, res) {
	var user = req.body;
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