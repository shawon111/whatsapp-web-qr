const { Server } = require("socket.io");
const { registerSocket } = require("../services/whatsapp.service");

function setupSocket(server) {
    const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

    io.on("connection", (socket) => {
        // Register this socket to WhatsApp service
        registerSocket(socket);
    });

    return io;
}

module.exports = setupSocket;