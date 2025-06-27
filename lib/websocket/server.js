const WebSocket = require('ws');

const sampleTracks = [
  "Bohemian Rhapsody - Queen",
  "Hotel California - Eagles", 
  "Stairway to Heaven - Led Zeppelin",
  "Imagine - John Lennon",
  "Hey Jude - The Beatles",
  "Smells Like Teen Spirit - Nirvana",
  "Like a Rolling Stone - Bob Dylan",
  "Yesterday - The Beatles",
  "Good Vibrations - The Beach Boys",
  "Johnny B. Goode - Chuck Berry",
  "What's Going On - Marvin Gaye",
  "My Generation - The Who",
  "A Change Is Gonna Come - Sam Cooke",
  "Respect - Aretha Franklin",
  "I Want to Hold Your Hand - The Beatles"
];

let activeTrackName = sampleTracks[0];
let connectedClients = new Set();

const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server started on port 8080');

wss.on('connection', (ws) => {
  console.log('New client connected');
  connectedClients.add(ws);
  
  ws.send(JSON.stringify({
    type: 'ACTIVE_TRACK_UPDATE',
    data: { trackName: activeTrackName }
  }));

  ws.on('close', () => {
    console.log('Client disconnected');
    connectedClients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    connectedClients.delete(ws);
  });
});

function broadcastToClients(message) {
  const messageStr = JSON.stringify(message);
  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

function changeActiveTrack() {
  const randomIndex = Math.floor(Math.random() * sampleTracks.length);
  activeTrackName = sampleTracks[randomIndex];
  
  console.log(`Active track changed to: ${activeTrackName}`);
  
  broadcastToClients({
    type: 'ACTIVE_TRACK_UPDATE',
    data: { trackName: activeTrackName }
  });
}

function scheduleNextChange() {
  const delay = 5000; 
  setTimeout(() => {
    changeActiveTrack();
    scheduleNextChange();
  }, delay);
}

scheduleNextChange();

process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server...');
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Shutting down WebSocket server...');
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
}); 