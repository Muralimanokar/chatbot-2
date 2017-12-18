var apiai = require('apiai');
var express = require('express');

var app = express();
app.use(express.static(__dirname));
var api = apiai("api-key");
var path = require("path");

app.get('/conversation', function(req, res){
	var message = req.query.message;
	var request = api.textRequest(message, {
		sessionId: 'session-id'
	});

	request.on('response', function(response) {
		res.send(JSON.stringify(response.result.fulfillment.speech));
	});

	request.on('error', function(error) {
		res.send(error);
	});

	request.end();

});

app.listen(3000, function(){
	console.log('listening on  port 3000');
});

app.get('/', function (req, res) {
	console.log(req.protocol);
})