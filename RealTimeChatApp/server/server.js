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
        methods: ['GET,POST,PUT,DELETE'],
    }
});


//Connection Socket IO
io.on("connection", (socket)=>{
    console.log("🙋User Connected: ", socket.id);


    socket.on("join_room", (data)=>{
        console.log("Someone Join Room!",data.room);
        
        socket.join(data.room);
    });

    socket.on('joined',(data)=>{
        // console.log("User Joined:... ", data);
        socket.to(data.room).emit("user_joined", data);
    });


    //For sending Message to Particular Room 
    socket.on("send_message", (data)=>{
        // console.log("Message Send: ", data);
        
        //Send message to all clients in the Room
        socket.to(data.room).emit("receive_message", data);
    });


    socket.on("disconnecting", () => {

        console.log("Disconnecting.......");
        // console.log("Disconnecting User: ", socket.id, "from Room: ", socket.rooms);

        //Getting Room Value
        const set_room_id = new Set(socket.rooms);
        set_room_id.delete(socket.id);
        const arr = Array.from(set_room_id);
        const room = arr[0];

        // console.log(`😓User Left... ID: ${socket.id} from 🏠 Room: ${room}`);

        socket.to(room).emit("user_left", {id: socket.id, room: room});
    });


    socket.on("disconnect", ()=>{
        console.log("😢User Disconnected! ID: ",socket.id);
    });

})



server.listen(4000, () =>{
    console.log('Server is running on port 4000!');
})


