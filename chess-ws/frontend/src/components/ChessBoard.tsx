import React from "react";
import type { Color, PieceSymbol, Square } from "chess.js";

export const ChessBoard: React.FC<{
  board: ({ square: Square; type: PieceSymbol; color: Color } | null)[][];
}> = ({ board }) => {
  return (
    <div className="mx-auto w-full max-w-md sm:max-w-lg">
      <div className="grid grid-cols-8 gap-0 border-2 rounded-lg overflow-hidden shadow-lg">
        {board.map((row, i) =>
          row.map((square, j) => {
            const isLight = (i + j) % 2 === 0;
            const bg = isLight ? "bg-amber-100/10" : "bg-slate-800/70";
            const piece = square ? square.type : null;
            const colorClass = square?.color === "w" ? "text-white" : "text-amber-300";
            // show algebraic coordinate on small screens to help orientation (optional)
            return (
              <div
                key={`${i}-${j}`}
                className={`${bg} aspect-square flex items-center justify-center text-2xl sm:text-3xl`}
              >
                <span className={colorClass + " select-none"}>{piece ? piece.toUpperCase() : ""}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
