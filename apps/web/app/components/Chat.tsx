'use client'

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useSocket } from '../context/SocketProvider';

const Chat = () => {
  const {sendMessage, messages} = useSocket();
  const [message, setMessage] = useState('');
  
    const handleChange = (content, delta, source, editor) => {
      const text = editor.getText(content);
      setMessage(text);
    };
  
    return (
      <section className='flex flex-col justify-between item-center h-[100vh] w-full'>
          {
              messages.map((msg, index)=>(
                  <div key={index} className='bg-gray-900 text-white p-2 m-2 rounded'>
                      {msg}
                  </div>
              ))
          }
      <div className='text-white flex justify-evenly items-center p-4'>
        <div className='w-[90vw]'>
          <ReactQuill 
            className='bg-gray-900 '
            theme="snow" 
            // value={message}
            onChange={handleChange} 
          />
        </div>
        <button className='bg-blue-900 hover:bg-blue-950 duration-200 text-white font-bold py-2 px-4 rounded' onClick={()=> sendMessage(message)}>Send</button>
      </div>
      </section>
    );
  };
  
  export default Chat;