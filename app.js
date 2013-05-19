var express = require('express'),
	tropo = require('tropo-webapi'),
	app = express(),
	users = require('./routes/users');
	auth = require('./routes/auth');
	portal = require('./routes/portal');
	events = require('./routes/events');

app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});
	
app.get('/', function(req, res) {
	res.send('Share your Success');
});

app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.createUser);

// if logged in:
app.get('/', portal.home);
// else
app.get('/', auth.login);

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

app.listen(3000);

console.log('Starting server on 3000... http://localhost:3000/');
