import "./App.css"

import { useEffect,useRef, useState } from 'react';  
function App() {

  const [socket, setSocket] = useState();
  // @ts-ignore
  const inputRef = useRef();
  function sendMessage(){
    if(!socket){
      return
    }
    // @ts-ignore
    const message = inputRef.current.value; // Get the value of the input field
    // @ts-ignore: ignore ts errors
    socket.send(message); // Send the message through the WebSocket
  }
  useEffect(() => { 
    const ws = new WebSocket("ws://localhost:8080");
    // @ts-ignore: Ignore TypeScript errors 
    setSocket(ws); 
    // Event listener 
    ws.onmessage = (event) => {
      alert(event.data);
    }
  },[]) 

  return (
    <>
      <h1>Ping_Pong</h1>
      <input ref={inputRef} type="text" placeholder="Message....." />
      <button onClick={sendMessage} >SEND</button>
    </>
  )
}

export default App; 