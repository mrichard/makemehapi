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
	path: path.join(__dirname, 'templates')
})

server.route({
	path: '/proxy',
	method: 'GET',
	handler: {
		proxy: {
			host: '127.0.0.1',
			port: 65535
		}
	}
})

server.start();