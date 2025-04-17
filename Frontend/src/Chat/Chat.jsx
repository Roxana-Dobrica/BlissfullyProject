import React from 'react';
import * as signalR from '@microsoft/signalr';
import { useEffect } from 'react';
import { useState } from 'react';


function Chat() {

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [senderId, setSenderId] = useState('ed2d60f0-7fdf-446e-a5c2-dbffac647eca'); 
    const [receiverId, setReceiverId] = useState('ee641278-6232-47a3-bd48-336936f2dd41'); 

    useEffect(() => {
        const connect = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7261/chatHub") 
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        return () => {
            if (connect) {
                connect.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', message => {
                        setMessages(messages => [...messages, message]);
                    });

                    connection.on('SendMessageError', error => {
                        console.error('Error sending message: ', error);
                    });
                })
                .catch(error => console.error('Connection failed: ', error));
        }
    }, [connection]);

    const sendMessage = async (content) => {
        if (connection && content) {
            const command = {
                senderId: senderId,
                receiverId: receiverId,
                messageContent: content,
                messageTime: new Date().toISOString()
            };

            try {
                await connection.invoke("SendMessage", command);
                setMessageContent('');
            } catch (error) {
                console.error('Send message failed: ', error);
            }
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className="message">{message}</div>
                ))}
            </div>
            <div>
                <input 
                    type="text" 
                    value={messageContent} 
                    onChange={(e) => setMessageContent(e.target.value)} 
                    placeholder="Type your message here"
                />
                <button onClick={() => sendMessage(messageContent)}>Send</button>
            </div>
        </div>
    );
};

export default Chat;



        