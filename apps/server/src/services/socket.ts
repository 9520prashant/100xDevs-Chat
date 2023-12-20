import {Server} from "socket.io"

class SocketService {
    private _io : Server;
    constructor(){
       console.log("Socket Server Inited")
       this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin:"*"
            }
       });
    }

    public initSocketListeners(){
        const io = this.io;

        console.log("Init Socket Listeners");

        io.on('connect', (socket)=>{
            console.log("new connection added", socket.id);

            socket.on('event:message', async ({message}:{message:string})=>{
                console.log("New Message Recieved", message);
            })
        })
    }

    get io(){
        return this._io;
    }
}

export default SocketService;