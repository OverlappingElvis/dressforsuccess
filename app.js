var express = require('express'),
	tropo = require('mongodb'),
	app = express(),
	users = require('./routes/users');
	
app.get('/', function(req, res) {
	res.send('Hello, World!');
});

app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.get('/users/create', users.create);


app.listen(3000);

console.log('Starting server on 3000...');