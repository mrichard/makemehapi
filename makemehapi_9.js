var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});


server.route({
	path: '/chickens/{breed}',
	method: 'GET',
	handler: function (request, reply) {
		reply("yes");
	},
	config: {
		validate: {
			params: {
				breed: Joi.string().required()
			}
		}
	}
})

server.start();