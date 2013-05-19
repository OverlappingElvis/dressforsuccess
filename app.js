var express = require('express'),
	tropo = require('tropo-webapi'),
	app = express(),
	users = require('./routes/users');
	
app.get('/', function(req, res) {
	res.send('Hello, World!');
});

app.get('/users/:id', users.findById);

app.listen(3000);

console.log('Starting server on 3000...');