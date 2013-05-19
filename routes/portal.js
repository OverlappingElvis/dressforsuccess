// I AM PORTAL
// I load static HTML pages ... let's jade this stuff

exports.home = function(req, res) {
	res.render('home.html', { title: 'Welcome!' });
};

exports.help = function(req, res) {
	res.render('help.html', { title: 'Have a Question?' });
};

exports.resources = function(req, res) {
	res.render('resources.html', { title: 'Resources' });
};

exports.share = function(req, res) {
	res.render('share.html', { title: 'Share Your Story, Share Your Success' });
};
