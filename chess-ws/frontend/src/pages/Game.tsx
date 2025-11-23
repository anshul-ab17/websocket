import { ChessBoard } from "../components/ChessBoard"
import { Button } from "../components/Button";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () =>{
    const socket = useSocket();
    const [board, setBoard] =useState([[]])

    useEffect(() =>{
        if(!socket){
            return;
        }
        socket.onmessage = function (event) {
        const message = JSON.parse(event.data);
        switch (message.type) {          
            case INIT_GAME:
                console.log("Game Initialized.")
                break;
            case MOVE:
                console.log("Move Made.")
                break;
            case GAME_OVER:
                console.log("Game Over.")
                break;
            }
        }
            
    },[socket])


    if(!socket) return <div>Connecting...</div>
    return (
    <div className="justify-center flex">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="grid grid-cols-6 gap-4 md:grid-cols-2">
                <div className="col-span-4 bg-red-950">
                    <ChessBoard />
                </div>

                <div className="col-span-2 bg-blue-950 w-full">
                    <Button onClick={() => {
                        socket.send(JSON.stringify({
                            type:"MOVE"
                        }))
                    }}>
                        Play
                    </Button>
                </div>
            </div>
        </div>
       
    </div>
)}