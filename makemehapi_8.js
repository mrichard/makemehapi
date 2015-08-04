var Hapi = require('hapi');
var path = require('path');
var fs = require('fs');
var rt = require('rot13-transform');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});


server.route({
	path: '/',
	method: 'GET',
	handler: function (request, reply) {
		reply(fs.createReadStream( path.join(__dirname, 'static/test.txt') ).pipe( rt() ));
	}
})

server.start();