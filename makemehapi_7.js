var Hapi = require('hapi');
var path = require('path');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.views({
	engines: {
		html: require('handlebars')
	},
	path: path.join(__dirname, 'templates'),
	helpersPath: 'helpers'
})

server.route({
	path: '/',
	method: 'GET',
	handler: {
		view: 'index.html'
	}
})

server.start();