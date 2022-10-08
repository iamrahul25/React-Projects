import React from 'react';
import { useState, useRef, useEffect } from 'react';

import ChatCard from './ChatCard';
import JoinLeftCard from './JoinLeftCard';
import './ChatApp.css';

import ScrollToBottom from "react-scroll-to-bottom";

import botimage from './bot_image.jpg';



const ChatApp = ({socket, name, room, image}) => {

    const helloMessage = {
        message: `👋Welcome! ${name} to the Chat Room : 🏠${room} `,
        name: "Chat Bot",
        room: room,
        image: botimage,
    }

    const scroll = useRef('');

    const userId = socket.id;
    const[message, setMessage] = useState('');
    const[messageList, setMessageList] = useState([]);


    function gettime() {
        var time = new Date();
        const currtime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        
        // console.log("Current Time:",currtime);
        return currtime;
    }

    const sendMessage = async()=>{

        const send_message = {
            type: 'message',
            message: message, 
            name: name, 
            id: userId,
            room: room, 
            time: gettime(),
            image: image,
        }

        await socket.emit('send_message', send_message);

        setMessageList((list) => [...list, send_message]);
        setMessage('');

        // //Auto Scroll 
        // scroll.current.scrollIntoView({behaviour: 'auto'});
    }

    //Recieve Message-----------------------
    useEffect(() => {
        socket.on("receive_message", (data) => {
            // console.log("Message Recieved: ", data);
            setMessageList((list) => [...list, data]);
        });

    }, [socket]);

    //First Time Joining Room--------------
    useEffect(()=>{
        socket.emit("joined",{room: room, id: userId, name: name});
    },[]);


    //when someone Join the Room-----------
    useEffect(()=>{
        socket.on("user_joined", (data) => {
            // console.log("User Joined: ",data);

            setMessageList((list) => [...list, {
                type: 'Joined',
                id: data.id,
                name: data.name,
            }]);
        });
    },[socket]);

    //When someone Left The Room----------
    useEffect(() => {
        socket.on("user_left", (data) => {
            console.log("User Left: ",data);

            setMessageList((list) => [...list, {
                type: 'Left',
                id: data.id,
            }]);
        });

    }, [socket]);



    return (

        <div className='chat_app_page'>
            
            <div className="chat_app">

                <div className="chat_header">

                    <div className="blob red"></div>
                    <div><p>LIVE CHAT</p></div>
                    
                </div>

                <ScrollToBottom className='chat_body'>

                {/* <div className="chat_body"> */}

                    <ChatCard key={-1} data={helloMessage} current_user={''}/>


                    {messageList.map((data, index)=>{

                        if(data.type==='Joined' || data.type==='Left'){
                            return <JoinLeftCard key={index} data={data}/>
                        }
                        else{
                            return <ChatCard key={index} data={data} current_user={name}/>
                        }
                    })}


                    {/* Auto Scroll Div */}
                    <div ref={scroll}> </div>
                
                {/* </div> */}

                </ScrollToBottom>


                <div className="chat_footer">

                    <button id="emoji_btn"><i className="fa-solid fa-face-grin-wide"></i></button>

                    <input value={message} onChange={e=>{setMessage(e.target.value)}} onKeyPress={(e) => {e.key === "Enter" && sendMessage()}}  type="text" placeholder="Type your message here..."/>

                    <button  onClick={sendMessage} id="send_btn"><i className="fa-solid fa-paper-plane"></i></button>

                </div>
                

            </div>

            <div className='madeby'>
                <p>Made with ❤️ by <a href="https://github.com/iamrahul25" target="_blank"  rel="noreferrer">Rahul</a> </p>
            </div>

        </div>
    )
}

export default ChatApp