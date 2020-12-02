const config = require("./config.json");

const acnReceiver = require('stagehack-sACN').Receiver;
acnReceiver.Start();

const WebSocket = require("wss");

let receiver = new acnReceiver.Universe(1);
receiver.on("packet", (packet) => {
    console.log(packet.getSlots());
});
