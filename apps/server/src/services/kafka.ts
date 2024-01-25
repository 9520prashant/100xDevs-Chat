import {Kafka, Producer} from "kafkajs"
import fs from "fs"
import  path  from "path"
import prismaClient from "./prisma"
const kafka = new Kafka({
    brokers: ["kafka-341b0e24-monorepo-100xdevs-chat-f232.a.aivencloud.com:19401"],
    ssl: {
        ca:[fs.readFileSync(path.resolve("./ca.pem"), "utf-8")]
    },
    sasl: {
        username: "avnadmin",
        password: "AVNS_gRHEWDyvIKdQhmHWptS",
        mechanism: "plain"
    },
})

let producer: null | Producer = null

export async function createProducer(){
    if(producer) return producer

    const localProducer = kafka.producer()
    await localProducer.connect()
    producer = localProducer
    return producer
}

export async function produceMessage(message: string){
    const producer = await createProducer()
    await producer.send({
        topic: "MESSAGES",
        messages:[
            {key: `message-${Date.now()}`, value: `${message}`}
        ]
    })
    return true;
}

export async function startMessageConsumer(){
    console.log("Starting Message Consumer");
    
    const consumer = kafka.consumer({groupId: "default"})
    await consumer.connect()
    await consumer.subscribe({topic: "MESSAGES", fromBeginning: true})
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({message, pause})=>{
            console.log("New Message Recieved from Kafka")
            if(!message.value) return;
            try{
                await prismaClient.message.create({
                    data: {
                        text: message.value?.toString()
                    }
                });
            }catch(err){
                console.log("Error while creating message", err)
                pause()
                setTimeout(()=>{consumer.resume([{topic:"MESSAGES"}])}, 60*1000)
            }

        }
    })
}

export default kafka