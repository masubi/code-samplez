 //
 //  global vars
 //
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var reqHandlers = require('./lib/pubApiReqHandlers');
 //var multer = require('multer'); // v1.0.5
 //var upload = multer(); // for parsing multipart/form-data
 var utils = require('./lib/utils');

 // config

 app.use(bodyParser.json()); // for parsing application/json
 app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
 //app.use('/static', express.static('pub'));

 var tryReqHandler = function(handler, req, res){
   try{
        handler(req, res);
   }catch(e){
       res.send("error");
       console.log("Error: "+ e.toString());
       console.log("req: "+utils.stringifyCircularObj(req));
   }
 };

 // modify a director
 app.post('/update', function(req, res){
     tryReqHandler(reqHandlers.update, req, res);
 });

 // register a director
 app.post('/directors', function(req, res){
     tryReqHandler(reqHandlers.directors, req, res);
 });

 // list all directors
 app.get('/list', function(req, res){
    tryReqHandler(reqHandlers.list, req, res);
 });

// setup server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
