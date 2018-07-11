var express = require("express");
var http = require("http");
var socketIO = require("socket.io");

var app = express();
var router = express.Router();
// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

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

var server = http.createServer(app);

var io = socketIO(server);
io.on("connection", socket => {
  console.log("Server: get Client");

  socket.on("start", () => {
    socket.emit("customEmit", 1234);
  });
});

app.get("/", (req, res) => res.send("Hello"));
app.get("/world", (req, res) => res.send("Hello World!"));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));
