var url = require('url');
var fs = require('fs');

var _chatrooms = {lobby: [{username: "bill", message: "this is dummby data", roomname: "lobby", createdAt: new Date()}]};//{lobby: 'lobby'};

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers =  {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10, // Seconds.
    "content-type": "application/json"
  };

//   fs.readFile('messages.txt', 'utf8', function( err, data ) {
//       console.log(data);
//       data = data.split("|");
//       console.log(data);
// //      data = JSON.parse(data);

//   });

  var chatroom = (url.parse(request.url).pathname).split('/')[2];  //this is a hack!! fix me!
  // Switches between request methods
  if (chatroom) {
    _chatrooms[chatroom] = ( _chatrooms[chatroom] ) ? _chatrooms[chatroom]: [];
    if (request.method === 'GET'){
      handleGet(request, response, headers, chatroom);
    } else if (request.method === 'POST'){
      handlePost(request, response, headers, chatroom);
    } else if (request.method === 'OPTIONS'){
      response.writeHead(200, headers);
      response.end();
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
    // var messsageText = JSON.stringify(POST);
    // fs.appendFile('messages.txt', messsageText, function(err) {
    //   if (!err) {
    //     console.log('messages updated');
    //   }
    // });
  });
  response.writeHead(201, headers);
  response.end();
};




exports.handleRequest = handleRequest;