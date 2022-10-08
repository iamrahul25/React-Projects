import React from 'react';
import ChatApp from './ChatApp';
import { useState } from 'react';
import './App.css';

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");
// const socket = io.connect("https://chat-app-serverrr.herokuapp.com/");

const App = () => {

    const[isLoggedIn, setIsLoggedIn] = useState(false);

    const[imageURL, setImageURL] = useState('');
    const[name, setName] = useState('')
    const[room, setRoom] = useState('');

    const[dp, setDp] = useState('https://i.ibb.co/Zd5rxk7/dp.jpg');

    function handleSubmit(e){

        e.preventDefault();
        console.log(`Form:\n imageURL: ${imageURL} name: ${name} room: ${room}`);

        socket.emit("join_room", {room: room});

        setIsLoggedIn(true);
    }
    

    //Update Profile Image
    function changeImage(e){
        const img = e.target.value;
        // console.log("Change image...",img);

        (img.trim()==='') ? setDp('https://i.ibb.co/Zd5rxk7/dp.jpg') : setDp(img);
    }



    return (
        <div className='App'>

            {!isLoggedIn ? <>

                <div className="login_page">

                    <div className="login">

                        <h1>Join a Chat</h1>

                        <div className="image_div">
                            <img src={dp} alt=""/>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <input className="input_field" value={imageURL} onChange={e=>{setImageURL(e.target.value); changeImage(e);}} type="text" placeholder="Image URL (Optional)" />
                            <input className="input_field" value={name} onChange={e=>{setName(e.target.value)}} type="text" placeholder="Name*" required/>
                            <input className="input_field" value={room} onChange={e=>{setRoom(e.target.value)}} type="text" placeholder="Room ID*" required/>

                            <button className="join_btn" type="submit">Join</button>

                        </form>

                    </div>

                </div>

            </> : 


            <>
                <ChatApp socket={socket} name={name} room={room} image={dp}/>
            
            </>}

        </div>
    )
}

export default App