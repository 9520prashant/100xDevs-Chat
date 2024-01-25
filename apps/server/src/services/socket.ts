import {Server} from "socket.io"
import prismaClient from "./prisma";
import Radis from "ioredis";
import {produceMessage} from "./kafka"


const pub = new Radis({
    port: 19388,
    host: "monrepo-100xdevs-chat-2884ee45-monorepo-100xdevs-chat-f232.a.aivencloud.com",
    username: "default",
    password: "AVNS_emOohKewVeUagd3zFcp"
});
const sub = new Radis({
    port: 19388,
    host: "monrepo-100xdevs-chat-2884ee45-monorepo-100xdevs-chat-f232.a.aivencloud.com",
    username: "default",
    password: "AVNS_emOohKewVeUagd3zFcp"
});
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
        sub.subscribe("MESSAGES");
    }

    public initSocketListeners(){
        const io = this.io;

        console.log("Init Socket Listeners");

        io.on('connect', (socket)=>{
            console.log("new connection added", socket.id);

            socket.on('event:message', async ({message}:{message:string})=>{
                console.log("New Message Recieved", message);
                // publishing message to redis
                await pub.publish("MESSAGES", JSON.stringify({message}));
            })
        });

        sub.on("message", async (channel, message)=>{
            if(channel === "MESSAGES"){
                console.log("New Message Published", message);
                io.emit("message", message);
                // producing message to kafka
                await produceMessage(message);
                console.log("Message Produced to Kafka");
            }
         }
        )
    }

    get io(){
        return this._io;
    }
}

export default SocketService;