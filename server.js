var express = require('express');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;

var app = express();

//Server static content for the app from 'public' directory i the app
app.use(express.static('public'));

//parse the application
app.use(bodyParser.json());

//Set Handlebars
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//import routes and give the server access to them
var routes = require('./controllers/catsController.js');

app.use(routes);

//start server
app.listen(PORT, function() {
    console.log('server listening on: http://locahost:' + PORT);
});