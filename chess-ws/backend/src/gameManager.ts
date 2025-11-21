import type { WebSocket } from "ws";
import type { Game } from "./game.js";

export class GameManager {
  private games: Game[];

  constructor() {
    this.games = [];
  }

  addUser(socket: WebSocket): void {
    
  }

  removeUser(socket: WebSocket): void {
    
  }

  private handleMessage(socket: WebSocket, data: WebSocket.Data): void {

  }
}
