import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [message, setMsg] = useState<string[]>(['Bienvendios!'])
  const wsRef=useRef;

  useEffect(() => {
    const ws = new WebSocket('http://localhost:8080')
    ws.onmessage = (event101) => {
      setMsg((n) => [...n, event101.data])
    }
    //@ts-ignore
    
    wsRef.current=ws;

    ws.onopen =() =>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }

    return () =>{
      ws.close();
    }
  }, [])

  return (
    <div className="h-screen w-screen bg-black flex flex-col"> 
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col items-start gap-2">
          {message.map((message) => (
            <span className="inline-block max-w-xs bg-white text-black text-sm rounded-lg px-3 py-2 shadow">
              {message}
            </span>
          ))}
        </div>
      </div> 
      <div className="w-full bg-white flex p-4 gap-2">
        <input id="message"className="flex-1 text-black" />
        <button onClick={()=>{
          const message=document.getElementById("message")?.value;
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:message
            }
          }))
        }}className="bg-amber-950 text-white px-4 py-2 rounded">
          SEND
        </button>
      </div>
    </div>
  )
}

export default App
