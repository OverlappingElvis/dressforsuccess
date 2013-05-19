var express = require('express'),
	tropo = require('tropo-webapi'),
	everyauth = require('everyauth'),
	app = express(),
	users = require('./routes/users');
	auth = require('./routes/auth');
	portal = require('./routes/portal');
	events = require('./routes/events');

// express config

app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});

// express routes

if (everyauth.loggedIn) { // if logged in
	app.get('/', function(req, res) {
		res.send('Share your Success');
	});

	app.get('/users', users.findAll);
	app.get('/users/:id', users.findById);
	app.post('/users', users.createUser);

	app.get('/', portal.home);

	// AUTH & LOGIN
	app.get('/login', auth.login);
	app.post('/login', auth.login);
	app.get('/reset', auth.reset);
	app.post('/reset', auth.reset);

	// PORTAL ... these *could* be dynamic & simply load the jade template associated with the page?
	app.get('/home', portal.home);
	app.get('/resources', portal.resources);
	app.get('/help', portal.help);

	// EVENTS ... ideally, pull from eventbrite, yay!
	app.get('/events', events.findAll);
} else { // user not logged in
	app.get('/', auth.login)
}

// authentication

everyauth.password
	.getLoginPath('/login')
	.postLoginPath('/login')
	.loginView('login')
	.authenticate(function(login, password) {

	})
	.loginSuccessRedirect('/');

app.listen(3000);

console.log('Starting server on 3000... http://localhost:3000/');
