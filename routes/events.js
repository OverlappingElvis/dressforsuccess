// I AM EVENTS
// I will pull from eventbrite, or just be a content page ... we'll see

exports.findById = function(req, res) {
	res.send({
		id: req.params.id,
		name: "events.findById test"
	});
};

exports.findAll = function(req, res) {
	res.send('events.findAll test');
};
