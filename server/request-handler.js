var url = require('url');
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var _chatrooms = {lobby: [{username: "bill", message: "this is dummby data", roomname: "lobby", createdAt: new Date()}]};//{lobby: 'lobby'};


var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers =  {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10, // Seconds.
    "content-type": "text/plain"
  };

  var chatroom = (url.parse(request.url).pathname).split('/')[2];  //this is a hack!! fix me!

  // Switches between request methods
  if (chatroom) {
    _chatrooms[chatroom] = ( _chatrooms[chatroom] ) ? _chatrooms[chatroom]: [];
    if (request.method === 'GET'){
      handleGet(request, response, headers, chatroom);
    } else if (request.method === 'POST'){
      handlePost(request, response, headers, chatroom);
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }
};


//
//  ---------- GET Request Method Handlers ---------------------
//
var handleGet = function(request, response, headers, chatroom) {
  response.writeHead(200, headers);
  response.end(JSON.stringify( _chatrooms[chatroom]) );
};

//
//  ---------- POST Request Method Handlers ---------------------
//
var handlePost = function(request, response, headers, chatroom) {
  var body = "";
  request.on('data', function(data){
    body += data;
  });
  request.on('end', function(){
    var POST = JSON.parse(body);
    POST.createdAt = new Date();
    _chatrooms[chatroom].push(POST);
  });
  response.writeHead(201, headers);
  response.end();
};




exports.handleRequest = handleRequest;