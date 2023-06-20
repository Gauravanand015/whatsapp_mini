const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const { connection } = require("./config/db");
const { userRouter } = require("./Route/users.route");
const { contactRouter } = require("./Route/contact.route");
const io = new Server(server)
require("dotenv").config()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("WhatsApp")
})

app.use("/",userRouter)
app.use("/",contactRouter)

server.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to Database")
        console.log("Connected to server")
    } catch (error) {
        console.log({message:"Error while connecting to database or server","Error":error})
    }
})