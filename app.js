var express = require('express'),
	tropo = require('tropo-webapi'),
	app = express(),
	users = require('./routes/users');
	
app.get('/', function(req, res) {
	res.send('Hello, World!');
});

app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.createUser);


app.listen(3000);

console.log('Starting server on 3000...');