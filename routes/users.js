exports.findById = function(req, res) {
	res.send({
		id: req.params.id,
		name: "Test"
	});
};