const config = require("./config.json");

const acnReceiver = require('stagehack-sACN').Receiver;
acnReceiver.Start();

const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");

var server = http.createServer((req, res) => {
  if(req.url == "/video.mp4") {
    fs.readFile("./videos/video.mp4", (err, data) => {
      if(err) {
        res.writeHead(500);
        return res.end("Error");
      }
      res.writeHead(200, {'Content-Type': 'video/mp4'});
      res.end(data);
    });
  }
  else {
    fs.readFile("./index.html", (err, data) => {
      if(err) {
        res.writeHead(500);
        return res.end("Error");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  }
});


server.listen(config.http_port);
const ws = new WebSocket.Server({server});

let receiver = new acnReceiver.Universe(1);
receiver.on("packet", (packet) => {
    ws.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) client.send(packet.getSlots()[0]);
    });
});
