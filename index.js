const express = require("express");
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');

const dataRoutes = require('./Routes/dataRoute');
const userRoutes = require('./Routes/userRoute');

const app = express();
require('dotenv').config({ path: './.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/api/v1',dataRoutes);
app.use('/api/v1', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World! how are you');
});

const PORT = process.env.PORT || 5003;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
// socket .io server
const http = require("http");
const {Server} = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    orgin: "https://animaltracking.netlify.app",
    methods: ["GET", "POST"]
  }
})

io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});


const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connected");

  console.log("Setting change streams");
  const gpsChangeStream = connection.collection("datas").watch();

  gpsChangeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        const gps = {
          _id: change.fullDocument._id,
          objectName: change.fullDocument.objectName,
          latitude: change.fullDocument.latitude,
          longitude: change.fullDocument.longitude,
          speed: change.fullDocument.speed,
          altitude: change.fullDocument.altitude,
          MeasureDate: change.fullDocument.createAt
        };

        console.log(gps);

        io.of("/api/socket").emit("newGps", gps);
        break;

    }
  });
})  

server.listen(PORT, console.log(`server started on port ${PORT}`));