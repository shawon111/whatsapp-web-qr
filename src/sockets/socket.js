const { Server } = require("socket.io");
const { getState, lastQr } = require("../services/whatsapp.service");
const logger = require("../utils/logger");

function setupSocket(server) {
    const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

    io.on("connection", (socket) => {
        socket.emit('status', getState());
        if (getState() === "waiting_for_qr" && lastQr) {
            socket.emit("qr", lastQr);
        }
    });

    return io;
}

module.exports = setupSocket;