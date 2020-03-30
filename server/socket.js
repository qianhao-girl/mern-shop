let io;

module.exports ={
    init : (httpServer) => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIo : () => {
        if(!io){
            throw new Error("Socket.is is not initialized!");
        }else{
            return io;
        }
    }
}
// Socket.io provides an easy API for building apps with event-based communication.
// Behind the scenes it uses !!!long-polling!!! or !!!WebSockets!!!
// to allow for near-realtime communication between your server and users