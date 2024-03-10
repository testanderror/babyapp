const WebSocket = require('ws');
const { exec } = require('child_process');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('WebSocket connection established');

  ws.on('message', function incoming(message) {
    console.log('Received message from client:', message);
    // Display alert on MacBook Air
    displayAlert(message);
  });
});

function displayAlert(message) {
  // Execute command to display alert/notification on your MacBook Air
  exec(`osascript -e 'display notification "${message}" with title "Sound Detection Alert"'`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error displaying alert: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Notification displayed: ${stdout}`);
  });
}
