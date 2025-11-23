import React, { useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard";
import Button from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game: React.FC = () => {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          chess.reset();
          setBoard(chess.board());
          break;
        case MOVE:
          chess.move(message.payload);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          // handle game over
          break;
      }
    };
  }, [socket, chess]);

  if (!socket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-300">Connecting to game server…</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/60 p-4 rounded-xl shadow-lg">
            <ChessBoard board={board} />
          </div>

          <aside className="bg-slate-900/40 p-4 rounded-xl shadow-inner flex flex-col gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Game Controls</h2>
              <div className="space-y-3">
                <div className="text-sm text-slate-300">Your move: {chess.turn() === "w" ? "White" : "Black"}</div>
                <div className="text-sm text-slate-300">FEN: <code className="text-xs break-all">{chess.fen()}</code></div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  socket.send(JSON.stringify({ type: "MOVE", payload: { from: "e2", to: "e4" } }));
                }}
              >
                Make test move
              </Button>

              <Button
                onClick={() => {
                  chess.reset();
                  setBoard(chess.board());
                }}
                className="bg-transparent text-amber-300 hover:bg-slate-800"
              >
                Reset
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Game;
