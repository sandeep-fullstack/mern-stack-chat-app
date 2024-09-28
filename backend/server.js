const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const cors = require('cors');

dotenv.config();
connectDB();
const app = express();
app.use(cors()); 
app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();


  app.get("/", (req, res) => {
    res.send("API is running..");
  });


// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;


const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`),
  console.log("http://localhost:5000")
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id); 
    console.log(userData._id);
    socket.emit("connected");
  });

  

 socket.on("send message", (data) => {
  const { message } = data;

  // Emit the received message to all connected clients
  io.emit("receive message", { message, sender: socket.id }); // Include sender's ID if needed
  console.log(`Message sent: ${message}`);
});
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
