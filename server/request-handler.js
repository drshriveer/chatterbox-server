var url = require('url');
/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var _messages = [{username: "bill",text:"this is dummby data", roomname:"lobby", createdAt: new Date()}];

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  if (request.method === 'GET'){
    var pathname = url.parse(request.url).pathname;
    if (pathname === '/1/classes/messages') {
       response.write(JSON.stringify({results: _messages}));
       response.end();
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
  } else if (request.method === 'OPTIONS') {
    console.log ('we have none');
  }
};


exports.handleRequest = handleRequest;