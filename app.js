var express = require('express'),
	tropo = require('tropo-webapi'),
	everyauth = require('everyauth'),
	consolidate = require('consolidate'),
	handlebars = require('handlebars'),
	fs = require('fs'),
	app = express(),
	users = require('./routes/users'),
	// auth = require('./routes/auth');
	portal = require('./routes/portal'),
	events = require('./routes/events'),
	account = require('./lib/account');

// express config

app.configure(function(){
  // Use handlebars as template engine
  app.engine("html", consolidate.handlebars);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

  app.use(express.static(__dirname + '/public'));
  // Register partials
  var partials = "./views/partials/";
  fs.readdirSync(partials).forEach(function (file) {
    var source = fs.readFileSync(partials + file, "utf8"),
        partial = /(.+)\.html/.exec(file).pop();
    Handlebars.registerPartial(partial, source);
  });
	
});

/* app.get('/', function(req, res) {
  res.render('index.html', {
    title: 'Hey There, Title Test'
  });
}); */

app.get('/', function(req, res){
// check if the user's credentials are saved in a cookie //
	if (req.cookies.user == undefined || req.cookies.pass == undefined){
		res.render('login', { title: 'Hello - Please Login To Your Account' });
	}	else{
// attempt automatic login //
		acount.autoLogin(req.cookies.user, req.cookies.pass, function(o){
			if (o != null){
			    req.session.user = o;
				res.redirect('/');
			}	else{
				res.render('login', { title: 'Hello - Please Login To Your Account' });
			}
		});
	}
});

app.post('/signup', users.createUser);

// express routes

/*
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
*/

// authentication

app.listen(3000);

console.log('Starting server on 3000... http://localhost:3000/');
