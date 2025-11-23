import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 rounded-3xl p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex items-center justify-center">
            <img
              src="/board.png"
              alt="chess board"
              className="w-full max-w-xs md:max-w-sm object-contain rounded-xl shadow-lg"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
              Play Chess — Online & Fast
            </h1>
            <p className="text-slate-300 mb-6">
              Quick matches, responsive board, and smooth controls. Play with friends or an AI.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-center md:justify-start">
              <Button onClick={() => navigate("/game")}>Start a Game</Button>
              <Button
                onClick={() => alert("How to play: move pieces by clicking or tapping on source then destination.")}
                className="bg-transparent text-amber-400 hover:bg-slate-800"
              >
                How to play
              </Button>
            </div>

            <div className="mt-6 text-sm text-slate-400">
              Tip: resize the browser to see the responsive layout.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
