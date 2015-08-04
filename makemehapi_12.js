var Hapi = require('hapi');
var path = require('path');
var Joi = require('joi');
var Boom = require('boom');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

server.state('session', {
    ttl: 1,
    path: '/',
    encoding: 'base64json',
    domain: 'localhost'
});


server.route({
  path: '/set-cookie',
  method: 'GET',
  handler: function (request, reply) {
  	reply('success').state('session', {key : 'makemehapi'});
  }
});

server.route({
  path: '/check-cookie',
  method: 'GET',
  handler: function (request, reply) {
    var session = request.state.session;
    console.log(session);
    if (session) {
      var error = Boom.badRequest('Invalid cookie value')
      reply(error);
    } else {
      reply({user : 'hapi'});
    }
  },
  config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
});

server.start();