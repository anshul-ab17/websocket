import { ChessBoard } from "../components/ChessBoard"
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () =>{
  const socket = useSocket();

  // keep a reactive chess state for rendering (turn/fen) and a ref for stable updates in callbacks
  const [chess, setChess] = useState(new Chess());
  const chessRef = useRef(chess);
  const [board, setBoard] = useState(chess.board());

  // keep the ref in sync whenever chess state changes
  useEffect(() => {
    chessRef.current = chess;
  }, [chess]);

  useEffect(() =>{
    if(!socket) return;

    socket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME: {
          // create a fresh chess instance and update both ref and state
          const newChess = new Chess();
          chessRef.current = newChess;
          setChess(newChess);
          setBoard(newChess.board());
          console.log("Game Initialized.");
          break;
        }
        case MOVE: {
          const move = message.payload;
          // apply move on the ref (always up-to-date), then update state & board from the ref
          try {
            chessRef.current.move(move);
            // create a new Chess instance from FEN for state to ensure re-render (avoid same-reference issues)
            const updated = new Chess(chessRef.current.fen());
            chessRef.current = updated;
            setChess(updated);
            setBoard(updated.board());
            console.log("Move Made.");
          } catch (err) {
            console.warn("Invalid move received:", move, err);
          }
          break;
        }
        case GAME_OVER:
          console.log("Game Over.");
          break;
        default:
          break;
      }
    };

    // cleanup handler on unmount or socket change
    return () => {
      if (socket) socket.onmessage = null;
    };
  }, [socket]);

  if(!socket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 px-4">
        <div className="text-center">
          <div className="inline-block animate-pulse rounded-full w-10 h-10 border-4 border-amber-400/40 border-t-amber-400 mb-4"></div>
          <div className="text-sm text-slate-300">Connecting to game server…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6">
      <div className="mx-auto max-w-screen-lg h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-stretch">

          {/* LEFT: Board */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 shadow-lg h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Game</h2>
              <div className="text-sm text-slate-300">
                Turn: {chess.turn() === "w" ? "White" : "Black"}
              </div>
            </div>

            <div className="flex flex-grow justify-center items-center">
              <div className="w-full max-w-full">
                <ChessBoard board={board} />
              </div>
            </div>
          </div>

          {/* RIGHT: Info + Play Button */}
          <div className="bg-slate-800/40 rounded-2xl p-6 shadow-inner flex flex-col h-full justify-between">

            <div>
              <h3 className="text-lg font-medium">Game Info</h3>

              <div className="text-sm text-slate-300 break-words mt-3">
                <div className="mb-2">
                  <span className="font-semibold">FEN:</span>
                </div>
                <code className="text-xs text-slate-200 bg-slate-900/40 p-2 rounded block">
                  {chess.fen()}
                </code>
              </div>
            </div>

            <Button
              onClick={() => {
                socket.send(JSON.stringify({ type: "MOVE" }));
              }}
              className="w-full text-lg py-3 mt-6"
            >
              Play
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Game;
