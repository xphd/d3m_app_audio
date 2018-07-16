var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var fs = require("fs");

var app = express();
var router = express.Router();

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.static("public"));

var server = http.createServer(app);

var io = socketIO(server);
io.on("connection", socket => {
  console.log("Server: get Client");

  // socket.on("start", () => {
  //   socket.emit("customEmit", 1234);
  // });
  // var audio = {
  //   id: "id_1",
  //   url: "http://localhost:3000/Beethoven_12_Variation.mp3"
  // };
  // socket.on("getAudio", () => {
  //   console.log("returnAudio emitted");
  //   socket.emit("returnAudio", audio);
  // });

  // listen to "getAudioLinks" emmited from frontend
  socket.on("getAudioLinks", () => {
    console.log("getAudioLinks activated");
    // get the list of links to audio file in this server
    var audioLinks = [];
    const testFolder = "./public/";
    fs.readdirSync(testFolder).forEach(file => {
      audioLinks.push("http://localhost:3000/" + file);
    });
    console.log("returnAudioLinks activated");

    // emit "returnAudioLinks" to the frontend with audioLinks
    socket.emit("returnAudioLinks", audioLinks);
    console.log(audioLinks);
  });
});

app.get("/", (req, res) => res.send("Hello"));
app.get("/world", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));
