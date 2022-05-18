const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const messageRoutes = require("./routes/message.routes.js");

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/", messageRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

httpServer.listen(PORT, () => {
  console.log("Сервер запущен на порту " + PORT);
});
