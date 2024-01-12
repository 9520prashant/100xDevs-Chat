'use client'

import React, { useCallback, useEffect, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps{
    children?: React.ReactNode
}

interface SocketContextInterface {
    sendMessage: (msg:string) => any;
}

const SocketContext = React.createContext<SocketContextInterface| null> (null);

// custom useSocket Hook
export const useSocket = () =>{
    const state = useContext(SocketContext);

    if(!state){
        throw new Error('State is not defined');
    }
    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) =>{
    const [socket, setSocket] = useState<Socket | null>(null);
    const sendMessage: SocketContextInterface['sendMessage'] = useCallback((msg: string)=>{        
        console.log("Send Message", msg)
        socket?.emit('event:message', {message: msg});
    },[socket]);

    const onMessageRecieved = useCallback((msg:string) =>{
        console.log("msg from server", msg)
    }, [])

    useEffect(()=>{
        const _socket = io('http://localhost:8000');
        _socket.on('message', onMessageRecieved)
        setSocket(_socket);
        return () =>{
            setSocket(null);
            _socket.off('message', onMessageRecieved)
            _socket.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    )
}