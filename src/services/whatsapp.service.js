const { Client, LocalAuth } = require("whatsapp-web.js");
const logger = require("../utils/logger");

let client = null;
let lastQr = null;
let state = "initializing";

// Store all connected sockets 
let connectedSockets = new Set();

const initwhatsapp = () => {
    if (client) return client;

    client = new Client({ authStrategy: new LocalAuth() });

    // QR event
    client.on("qr", (qr) => {
        lastQr = qr;
        state = "waiting_for_qr";
        logger.info("QR RECEIVED");

        // Broadcast to all connected sockets
        connectedSockets.forEach((socket) => socket.emit("qr", qr));
        connectedSockets.forEach((socket) => socket.emit("status", state));
    });

    client.on("authenticated", () => {
        state = "authenticated";
        logger.info("Client is authenticated!");
        connectedSockets.forEach((socket) => socket.emit("authenticated"));
    });

    client.on("ready", () => {
        state = "ready";
        logger.info("Client is ready!");
        connectedSockets.forEach((socket) => socket.emit("ready"));
    });

    client.on("auth_failure", (msg) => {
        state = "auth_failure";
        logger.error("Authentication failure:", msg);
        connectedSockets.forEach((socket) => socket.emit("auth_failure"));
    });

    client.on("disconnected", (reason) => {
        state = "disconnected";
        logger.info("Client was logged out:", reason);
        client.initialize();
    });

    client.initialize();
    return client;
};

const registerSocket = (socket) => {
    connectedSockets.add(socket);

    // Send current state
    socket.emit("status", state);

    // Send last QR 
    if (state === "waiting_for_qr" && lastQr) {
        socket.emit("qr", lastQr);
    }

    // Cleanup on disconnect
    socket.on("disconnect", () => {
        connectedSockets.delete(socket);
    });
};

const sendMessage = async (number, message) => {
    if (!client || state !== "ready") throw new Error("WhatsApp client is not ready");

    const numberId = await client.getNumberId(number);
    if (!numberId) throw new Error("Invalid phone number");

    const chatId = `${number}@c.us`;
    const result = await client.sendMessage(chatId, message);
    logger.info(`Message sent to ${number}`);
    return result;
};

const getState = () => state;
const getLastQr = () => lastQr;

module.exports = {
    initwhatsapp,
    sendMessage,
    getState,
    getLastQr,
    registerSocket,
};