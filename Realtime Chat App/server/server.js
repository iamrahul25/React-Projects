const express = require('express');
const app = express();

//CORS - For Cross Origin Resource Sharing
const cors = require('cors');
app.use(cors());

//Socket.io is created upon http server --- We can do this with express also.
const http = require('http');

//Server is a class
const {Server} = require('socket.io');

//Creating Server
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        // origin: 'https://realtime-chat-app-rahul.netlify.app',
        methods: ['GET,POST,PUT,DELETE'],
    }
});


//Creating a Global Object to store all rooms and their users
let allRooms = {};
let userSet = new Set();

//Function to get totalRooms and totalUsers
const getDetails = () => {
    const totalRooms = Object.keys(allRooms).length;
    const activeUsers = Object.values(allRooms).reduce((acc, val) => acc + Object.keys(val).length, 0);
    const totalUsers = userSet.size;

    return {totalRooms, activeUsers, totalUsers};
}

//Connection Socket IO
io.on("connection", (socket)=>{
    console.log("🙋User Connected: ", socket.id);

    //Inseting userId in userSet
    userSet.add(socket.id);

    //Updating Details
    io.emit('details', getDetails());

    //Joining Room
    socket.on("join_room", (data)=>{
        socket.join(data.room);
    });


    //If Someone Joined the Room send Notification to all users
    socket.on('joined',(data)=>{

        console.log("🙋‍♂️User Details: ", data);
        
        const{roomName, userId, userName, userImage} = data;

        //Adding User to allRooms Object
        if(allRooms[roomName]){
            allRooms[roomName] = {...allRooms[roomName], [userId]: {userId, userName, userImage}};
        }else{
            allRooms[roomName] = {[userId]: {userId, userName, userImage}};
        }
        // console.log("🏠All Rooms: ", allRooms);

        //Updating Details
        io.emit('details', getDetails());

        //Sending Notification to all users that someone joined the room
        const users = allRooms[roomName];
        // console.log("🌍All Online Users: ", users);

        //Send users to all members including current user
        io.to(roomName).emit('user_joined', {users: users, user: {userId, userName}});
    });


    //For sending Message to Particular Room 
    socket.on("send_message", (data)=>{
        // console.log("Message Send: ", data);
        
        //Send message to all clients in the Room
        socket.to(data.room).emit("receive_message", data);
    });


    socket.on("disconnecting", () => {

        // console.log("Disconnecting User: ", socket.id, "from Room: ", socket.rooms);

        //Getting Room Value
        let room;
        for (const i of socket.rooms) {
            if (i !== socket.id){
                room = i;
            }
        }

        const userId = socket.id;
        let users, user;

        if(room!==undefined){
            users = allRooms[room];
            user = users[userId];
        }

        //Removing userId from userSet
        userSet.delete(userId);

        //Removing User from allRooms Object
        if(allRooms[room]){
            delete allRooms[room][userId];
        }

        //Checking If Room is Empty --> Then Deleting the Empty Room
        if(allRooms[room] && Object.keys(allRooms[room]).length === 0){
            delete allRooms[room];
        }

        if(room!==undefined){
            console.log(`😓User Left... ID: ${socket.id} from 🏠 Room: ${room}`);
            socket.to(room).emit("user_left", {users,user});
        }

    });


    socket.on("disconnect", ()=>{

        io.emit('details', getDetails());

        console.log("😢User Disconnected! ID: ",socket.id);
    });

})

const PORT = process.env.PORT || 4000;

server.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}!`);
})

app.get('/',(req,res)=>{
    res.send("😃🙌 Server is Running! Fine");
})



