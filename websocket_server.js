const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('WebSocket connection established');

  ws.on('message', function incoming(message) {
    console.log('Received message from client:', message);
    // Handle message from client (e.g., display alert)
    displayAlert(message);
  });
});

function displayAlert(message) {
  // Code to display alert/notification on MacBook Air
  console.log('Displaying alert:', message);
}
