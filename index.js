const config = require("./config.json");

const acnReceiver = require('stagehack-sACN').Receiver;
acnReceiver.Start();

const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");

const videoFiles = Object.values(config.videos);
console.log(videoFiles);

var server = http.createServer((req, res) => {
  if(req.url == "/config.json") {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(config));
  }
  else if(videoFiles.includes(req.url.replace("/", ""))) {
    fs.readFile("./videos/" + req.url.replace("/", ""), (err, data) => {
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
let last_received_data = -1;
receiver.on("packet", (packet) => {
  if(packet.getSlots()[0] == last_received_data) return;
  last_received_data = packet.getSlots()[0]
    ws.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) client.send(data);
    });
});
