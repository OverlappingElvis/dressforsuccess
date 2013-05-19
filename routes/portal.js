// I AM PORTAL
// I load static HTML pages ... let's jade this stuff

exports.home = function(req, res) {
	res.send({
		name: "portal.home"
	});
};

exports.help = function(req, res) {
	res.send({
		name: "portal.help"
	});
};

exports.resources = function(req, res) {
	res.send({
		name: "portal.resources"
	});
};
