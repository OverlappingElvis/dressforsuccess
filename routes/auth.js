// AUTH.JS
// I Log you in and stuff

exports.login = function(req, res) {
	res.send({
		name: "auth.login form"
	});
};

exports.reset = function(req, res) {
	res.send({
		name: "auth.reset form ... might just be a contact number"
	});
};
