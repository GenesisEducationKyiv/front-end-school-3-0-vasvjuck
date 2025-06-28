import { WebSocketServer, WebSocket } from 'ws';
import { SAMPLE_TRACKS } from './constants.js';

let activeTrackName: string = SAMPLE_TRACKS[0]!;
const connectedClients: Set<WebSocket> = new Set();

const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server started on port 8080');

wss.on('connection', (ws: WebSocket) => {
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

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
    connectedClients.delete(ws);
  });
});

function broadcastToClients(message: { type: string; data: { trackName: string } }): void {
  const messageStr = JSON.stringify(message);
  connectedClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

function changeActiveTrack(): void {
  const randomIndex = Math.floor(Math.random() * SAMPLE_TRACKS.length);
  activeTrackName = SAMPLE_TRACKS[randomIndex]!;
  broadcastToClients({
    type: 'ACTIVE_TRACK_UPDATE',
    data: { trackName: activeTrackName }
  });
}

setInterval(changeActiveTrack, 30000);

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