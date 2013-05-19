var express = require('express'),
	tropo = require('tropo-webapi'),
	everyauth = require('everyauth'),
	consolidate = require('consolidate'),
	handlebars = require('handlebars'),
	fs = require('fs'),
	app = express(),
	users = require('./routes/users'),
	portal = require('./routes/portal'),
	events = require('./routes/events'),
 	admin = require('./routes/admin'),
	account = require('./lib/account');

// express config

app.configure(function(){
  // Use handlebars as template engine
  app.engine("html", consolidate.handlebars);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);

  app.use(express.static(__dirname + '/public'));
  // Register partials
  var partials = "./views/partials/";
  fs.readdirSync(partials).forEach(function (file) {
    var source = fs.readFileSync(partials + file, "utf8"),
        partial = /(.+)\.html/.exec(file).pop();
    console.log(partial+' - '+source);
    handlebars.registerPartial(partial, source);
  });
	
});

app.get('/', function(req, res){
// check if the user's credentials are saved in a cookie //
	if (!!req.cookies.user || !!req.cookies.pass) {
		res.render('login.html', { title: 'Hello - Please Login To Your Account' });
	} else {
// attempt automatic login //
		account.autoLogin(req.cookies.user, req.cookies.pass, function(o){
			if (o != null){
			    req.session.user = o;
				res.redirect('/');
			}else{
				// res.render('login.html', { title: 'Hello - Please Login To Your Account' });
				res.redirect('/home');
			}
		});
	}
});

app.post('/login', users.login);
app.get('/users', users.findAll);
app.get('/users/get/:id', users.findById);

// ADMIN routes - /users is internal, /admin is the UI wrapper
app.get('/admin', admin.list);
app.get('/admin/edit/:id', admin.showEdit);
app.get('/admin/create', admin.showCreate);
app.post('/admin/create', users.createUser);

// express routes

/*
if (everyauth.loggedIn) { // if logged in
	app.get('/', function(req, res) {
		res.send('Share your Success');
	});
	app.get('/users', users.findAll);
	app.get('/users/:id', users.findById);
	app.post('/users', users.createUser);
} else { // user not logged in
  app.get('/', auth.login)
}
*/

	// PORTAL ... these *could* be dynamic & simply load the jade template associated with the page?
	app.get('/home', portal.home);
	app.get('/resources', portal.resources);
	app.get('/help', portal.help);
 	app.get('/share', portal.share);
	// EVENTS ... ideally, pull from eventbrite, yay!
	app.get('/events', events.findAll);

app.listen(3000);

console.log('Starting server on 3000... http://localhost:3000/');
