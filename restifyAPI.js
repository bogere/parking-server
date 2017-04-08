//restify is a node.js module built specifically to enable you to build correct REST web services.
//Express' use case is targeted at browser applications and contains a lot of functionality, such as
//templating and rendering, to support that. Restify does not.

var restify = require('restify');

 var server = restify.createServer({
   name: 'PMS',
   version: '1.0.0' //borrows alot from ExpressJS
 });

//server.use(restify.acceptParser());//AssertionError: acceptable (string) is requireds
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

//working on the routes.
server.get('/parking/:name', function(req,res,next){
  res.send(req.params);
   return next()
});

server.listen(3030, function(){
  console.log('%s listening at %s', server.name , server.url)
})
