console.log('Socket Server is running...');
const express = require('express');
const session = require('express-session');
const body_parser = require('body-parser');
const ngrok = require('ngrok');
const path = require('path');
const socket = require('socket.io');
const port = 3000;
const app = express();
const server = app.listen(port, serverListenerCallback);
const io = socket(server);
// const sessionManager = session({
//   secret: 'Much Secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {}
// });
// io.use((socket, next) => {
//   sessionManager(socket.request, socket.request.res, next);
// });
io.sockets.on('connection', (socket) => {
  // console.log('New Connection from Client id: '+socket.id+'\n'+'Socket Session: '+
  //             socket.request.session);
  //
  // console.log(socket.request.session.refreshCounter+', '+socket.request.session.user);
  socket.on('drawing', (data) => {
    //emits to all clients excluding the sending one
    socket.broadcast.emit('reDrawn', data);
    //emits to all clients including the sending one
    // io.sockets.emit('reDrawn', data);
    // console.log(data);
  });
  socket.on('disconnect', (res) => {
    console.log('Client id: '+socket.id+' has disconnected!'+' '+res);
  });
});
// app.use(sessionManager);
// app.use(body_parser.urlencoded({
//   extended: true
// }));
// app.use(body_parser.json());
app.use(express.static(path.join(__dirname, 'publicPages/p5socketsClient')));
// app.get('/getSession', (req, res) => {
//   res.setHeader('content-type','application/json');
//   req.session.greeting = 'This is your session variable!';
//   if (req.session.refreshCounter) {
//   	req.session.refreshCounter++;
//   } else {
//    	req.session.refreshCounter = 1;
//   }
//   req.session.sessionInfo = 'You have refreshed your session ' + req.session.refreshCounter + ' times!';
//   res.send(req.session);
//   res.end();
// });
// app.post('/postToSession', (req, res) => {
//   console.log('POST');
//   res.end();
// });
function serverListenerCallback() {
  console.log('Listening on port '+port+'...');
  // Start Tunneler, Prints Tunnel Address url
  (async () => {
    var url = await ngrok.connect(port, (err, url) => {
      if (err) {
        console.log('Something went wrong with ngrok: '+err);
      }
    });
    console.log('Tunnel Address: '+url+'\n');
  })();
}
