const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const routes = require('./routes');

// Create server
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

app.set('port', (PORT));

app.use('/public', express.static(__dirname + '/public'));

// Create database instance and start server
const adapter = new FileAsync('db.json');
low(adapter)
	.then(db => {
		routes(app, db);
	})
	.then(() => {
		app.listen(app.get('port'), () => console.log('listening on port ' + app.get('port')))
	});