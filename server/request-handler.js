var url = require('url');
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var _messages = [{username: "bill",text:"this is dummby data", roomname:"lobby", createdAt: new Date()}];
var _chatrooms = {};//{lobby: 'lobby'};


var handleRequest = function(request, response) {
  var statusCode = 200;
  var headers =  {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };

  headers['Content-Type'] = "text/plain";
  // response.writeHead(statusCode, headers);

  console.log("Serving request type " + request.method + " for url " + request.url);

  if (request.method === 'GET'){
    var pathname = url.parse(request.url).pathname;
    if (pathname === '/classes/messages') {
      response.writeHead(statusCode, headers);
       response.end(JSON.stringify({results: _messages}));
       // response.end();
    }
    if (pathname === '/classes/room1') {
       response.writeHead(statusCode, headers);
       response.end(JSON.stringify(Object.keys(_chatrooms)));
       // response.end();
    }
  } else if (request.method === 'POST'){
    var body = "";
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var POST = JSON.parse(body);
      POST.createdAt = new Date();
      _messages.push(POST);
    });
    response.writeHead(201, headers);
    response.end();
  } else if (request.method === 'OPTIONS') {
    console.log ('we have none');
  }

  // response.end();
};



exports.handleRequest = handleRequest;