var express = require('express'),
	app = express();
	
app.get('/', function(req, res) {
	res.sent('Hello!');
});

app.listen(3000);

console.log('Starting server on 3000...');