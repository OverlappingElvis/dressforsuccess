exports.findById = function(req, res) {
	res.send({
		id: req.params.id,
		name: "Test"
	});
};

exports.findAll = function(req, res) {
	res.send('User list goes here');
};

exports.create = function(req, res) {
	res.send('User creation goes here');	
};