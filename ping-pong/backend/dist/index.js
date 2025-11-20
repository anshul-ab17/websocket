import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(socket) {
    console.log("connected");
    // setInterval(()=>{
    //   socket.send(`Current stock price ${Math.random()}`)
    // },100)
    socket.on("message", (e) => {
        if (e.toString() == "ping") {
            socket.send("pong");
        }
    });
});
//# sourceMappingURL=index.js.map