import { io } from 'socket.io-client'
import './chatbox.css'
import { useEffect, useRef, useState } from 'react'

const ENDPOINT = 'http://localhost:3000/';
const socket = io(ENDPOINT, {
    withCredentials: true,

});


export const Chatbox = () => {   
    const [chat, setChat] = useState<object[]>([]);
    const [chatmessage, setChatmessage] = useState('');
    const [subscription, setSubscription] = useState<object>(JSON.parse(localStorage.getItem("subscription")||"{}"));
    const sendMessage = () => {
        const message = JSON.stringify({chatmessage:chatmessage,subscription:subscription} )
        socket.emit("send_message", {  message: message })
    }

    useEffect(()=>{
        socket.on('chat-message',data=>{
            console.log(data)
            setChat([...chat,data])
            
        })
        console.log(chat)
    },[chat])
   

    return <div className="chatboxWrapper">
        <div className='messagesBox' style={{ height: '90%', overflowY: 'scroll' }}>
            <ul className='messages'>
                {chat.map((chat: any, index) => {
                    return <li key={index}>{chat.user}:{chat.message}</li>
                })}
            </ul>
        </div>
        <div className="chatForm">
            <input className="chatInput" id='chatMes' value={chatmessage} onChange={(e) => {setChatmessage(e.target.value);if(chatmessage!==''){socket.emit('typing')}}}></input>
            <button className="sendButton" id='sendChat' onClick={(e) => { e.preventDefault(); if(chatmessage!==''){ sendMessage();setChatmessage('')} }}>Send</button>
        </div>

    </div>
}
