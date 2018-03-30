var socket;
var url = window.location.href;
var clientColor;
// var input, button, greeting;
function setup() {
  axios.defaults.withCredentials = true;
  // handleGetRequest();
  createCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
  background(99);
  clientColor = {
    r: Math.floor(Math.random()*256),
    g: Math.floor(Math.random()*256),
    b: Math.floor(Math.random()*256),
  };
  socket = io.connect(url);
  socket.on('reDrawn', (data) => {
    noStroke();
    fill(data.color.r, data.color.g, data.color.b);
    ellipse(data.xloc, data.yloc, 40, 40);
  });
}
///////////////////////////////////////////////////
// function addInput() {
//
//   input = createInput();
//   input.position(20, 65);
//
//   button = createButton('submit');
//   button.position(input.x + input.width, 65);
//   button.mousePressed(greet);
//
//   greeting = createElement('h2', 'what is your name?');
//   greeting.position(20, 5);
//
//   textAlign(CENTER);
//   textSize(50);
// }
//
// function greet() {
//   var name = input.value();
//   greeting.html('hello '+name+'!');
//   input.value('');
//
//   for (var i=0; i<200; i++) {
//     push();
//     fill(random(255), 255, 255);
//     translate(random(width), random(height));
//     rotate(random(2*PI));
//     text(name, 0, 0);
//     pop();
//   }
// }
//////////////////////////////////////////////////
function draw() {
}
function mouseDragged() {
  if (socket) {
    performAction();
  }
}
function mousePressed() {
  if (socket) {
    performAction();
  }
}
function performAction() {
  socket.emit('drawing', {
    xloc: mouseX,
    yloc: mouseY,
    color: clientColor,
  });
  noStroke();
  fill(clientColor.r, clientColor.g, clientColor.b);
  ellipse(mouseX, mouseY, 40, 40);
}
// function handleGetRequest() {
//   axios.get(url+'getSession')
//        .then((res) => {
//          // console.log('session from standard xhr http: '+res);
//        })
//        .catch((error) => {
//          // console.log('error from standard xhr http: '+error);
//   });
// }
// function handlePostRequest(inputVal) {
//   axios.post(url+'postToSession',{
//        }).then((res) => {
//          // console.log('session from standard xhr http: '+res);
//        }).catch((error) => {
//          // console.log('error from standard xhr http: '+error);
//   });
// }
