import { WebSocketServer } from 'ws';
import { gameManager } from './gameManager.js';

const wss = new WebSocketServer({ port: 8080 });

const gameManager =new gameManager();

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws)
    
});