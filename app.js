const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes")
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')


const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const server = http.createServer(app)

// middleware
// app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors())

// socket.io configuration
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
  }
})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on("join_room",(roomId) => {
    socket.join(roomId)
    console.log(`user with id: ${socket.id} joined room id: ${roomId}`)
  })
  
  socket.on("send_message", (Msgdata) => {
    socket.to(Msgdata.room).emit("recieve_message", Msgdata)
  })  

  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id)
  })
})

// // view engine
// app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://Ananya:chunchun8@cluster0.xhwif.mongodb.net/social-media-app?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('mongoose connected')
    server.listen(8000, () => {
      console.log("Listening at port 8000");
    })
  }
  )
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.use(userRoutes)
app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes)
