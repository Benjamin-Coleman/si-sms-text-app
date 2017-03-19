// get the http module
var http = require("http");

// load express + body parser
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

// ejs engine for views
app.set( 'view engine', 'ejs' );

//setup assets folder
	app.use(express.static('public'));

//basic routing

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// 	app.get("/about/", function(req, res) {
// 		res.sendFile(__dirname + "/about.html");

// 	});

	app.get("/text/", function(req, res) {
		res.sendFile(__dirname + "/text.html");

	});

	app.get('/text-sent', function(req, res){
		res.render('text-sent');
	});

	app.get('/text-error', function(req, res){
		res.render('text-error');
	});

// local host on :6789
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


var accountSid = 'ACc1e626397c8ec4ebf43ca9e5070eeb83'; // Your Account SID from www.twilio.com/console
var authToken = 'defe59363838fc96362ac1f1e662882b';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

//var sendText = require('./assets/app');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/text', urlencodedParser, function(req, res){
	console.log(req.body);
	//res.sendFile(__dirname + "/text.html");
	//res.render('text', {qs: req.query});
	client.messages.create({
    body: req.body.textContent,
    to: req.body.phoneNumber,  // Text this number
    from: '+19592008919' // From a valid Twilio number
}, function(err, message) {
    if(err) {
    	res.render('text-error', {data: err});
    	console.log(err);
        console.error(err.message);
        return;
    }
    else {
    	res.render('text-sent', {data: req.body});
    }
});

});