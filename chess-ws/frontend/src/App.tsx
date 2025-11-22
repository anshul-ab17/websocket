import { useState } from "react";
import "./App.css";

function App() {
  const [count , setCount] = useState(0);
 

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
        <button> 
          JOin Room
        </button>
    </div>
  );
}

export default App;
