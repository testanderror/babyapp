let stream;
let audioContext;
let mic;

const ws = new WebSocket('ws://macbook-air.local:8080'); // WebSocket server address

ws.onopen = function () {
  console.log('WebSocket connection established');
};

function startListening() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (s) {
      stream = s;
      audioContext = new AudioContext();
      mic = audioContext.createMediaStreamSource(stream);
      let analyser = audioContext.createAnalyser();
      mic.connect(analyser);
      analyser.fftSize = 256;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      function detectVolume() {
        analyser.getByteFrequencyData(dataArray);
        let average =
          dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
        if (average > 50) {
          // Adjust threshold as needed
          console.log('Sound detected!');
          const message = 'Sound threshold exceeded';
          ws.send(message); // Send message to WebSocket server
        }
        requestAnimationFrame(detectVolume);
      }

      detectVolume();
    })
    .catch(function (err) {
      console.error('Error accessing microphone:', err);
    });
}

function stopListening() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
