import {useEffect, useState } from 'react';
import ChatApp from './ChatApp';

import './styles/App.css';
import './styles/ChatApp.css';
import './styles/JoinLeftCard.css';
import './styles/OnlineUsers.css';

import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");
const socket = io.connect("https://chatapp-backend-sbx0.onrender.com");

const randomList = [2,3,7,12,13,14,15,16,17,20,26,30];

const App = () => {

    const[isLoggedIn, setIsLoggedIn] = useState(false);

    const[imageURL, setImageURL] = useState('');
    const[name, setName] = useState('')
    const[room, setRoom] = useState('');

    const[totalRooms, setTotalRooms] = useState(0);
    const[totalUsers, setTotalUsers] = useState(0);
    // const[activeUsers, setActiveUsers] = useState(0);
    

    const[dp, setDp] = useState('https://i.ibb.co/Zd5rxk7/dp.jpg');

    function handleSubmit(e){
        e.preventDefault();
        console.log(`Form:\n imageURL: ${imageURL} name: ${name} room: ${room}`);

        socket.emit("join_room", {room: room, name: name, image: imageURL});
        setIsLoggedIn(true);
    }

    //Change Avatar Image
    function changeAvatar(){
        const randomNumber = Math.floor(Math.random()*randomList.length);
        setDp(`https://avatars.dicebear.com/api/avataaars/:${randomList[randomNumber]}.svg`);
    }
    
    //Update Profile Image
    function changeImage(e){
        const img = e.target.value;
        (img.trim()==='') ? setDp('https://i.ibb.co/Zd5rxk7/dp.jpg') : setDp(img);
    }

    //Listen for details
    useEffect(() => {
        socket.on("details", (data) => {
            console.log("Details: ", data);
            setTotalRooms(data.totalRooms);
            // setActiveUsers(data.activeUsers);
            setTotalUsers(data.totalUsers);
        })
    }, [socket]);
    

    return (
        <div className='App'>

            {!isLoggedIn ? <>

                <div className="login_page">

                    <div className="login">

                        <h1>Join a Chat</h1>

                        <div className="image_div">
                            <img src={dp} alt=""/>
                            <span className='random_image' onClick={changeAvatar}><i className="fa-solid fa-shuffle"></i></span>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <input className="input_field" value={imageURL} onChange={e=>{setImageURL(e.target.value); changeImage(e);}} type="text" placeholder="Image URL (Optional)" />
                            <input className="input_field" value={name} onChange={e=>{setName(e.target.value)}} type="text" placeholder="Name*" required/>
                            <input className="input_field" value={room} onChange={e=>{setRoom(e.target.value)}} type="text" placeholder="Room ID*" required/>

                            <button className="join_btn" type="submit">Join</button>

                        </form>

                    </div>

                    <div className='room_details'>
                        <p>Total Online Users: <strong>{totalUsers}</strong> </p>
                        <p>Total Active Rooms: <strong>{totalRooms}</strong> </p>
                        {/* <p>Total Active Users: <strong>{activeUsers}</strong> </p> */}
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