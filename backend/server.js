var http = require("http");
var fs = require("fs");
var server = http
  .createServer(function(req, res) {
    // fs.readFile('./index.html',function(error,data){//若根目录有index.html，访问地址，将显示index.html
    //     res.writeHead(200,{'Content-Type':'text/html'});
    //     res.end(data,'utf-8');
    // });
  })
  .listen(3000, "127.0.0.1"); //创建http服务
console.log("Server running at http://127.0.0.1:3000/");

var io = require("socket.io").listen(server);
io.sockets.on("connection", socket => {
  var timer = "";
  console.log("链接成功");
  socket.on("start", () => {
    //监听前端发送的start
    timer = setInterval(function() {
      //定时器每五秒发一次
      socket.emit("customEmit", 1234);
    }, 5000);
  });
});

// const express = require("express");

// const app = express();

// // Add headers
// app.use(function(req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

// app.get("/", (req, res) => res.send("Hello"));
// app.get("/world", (req, res) => res.send("Hello World!"));

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server running on port ${port}`));
