var mongo = require('mongodb'),
	Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    server = new Server('localhost', 27017, {auto_reconnect: true, w: 1}),
    db = new Db('dressforsuccess', server);

db.open();

exports.create = function(req, res) {
	var story = req.params;
	db.collection('stories', function(err, collection) {
		collection.save({
			_id: story.id ? story.id : null,
			title: story.title,
			content: story.content,
			userId: story.userId,
			type: story.type
		});
	})
};

exports.findAll = function() {
	db.collection('stories', function(err, collection) {
		collection.find().toArray(function(err, items) {
			return items;
		});
	});
}