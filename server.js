const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const { initwhatsapp } = require('./src/services/whatsapp.service');
const port = process.env.PORT || 5000;
const setupSocket = require('./src/sockets/socket');
const errorHandler = require('./src/middlewares/errorHandler');

dotenv.config();
const app = express();
const server = http.createServer(app);
const rootPath = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootPath, 'public')));

// Setup Socket.IO
const io = setupSocket(server);

// Initialize WhatsApp client
initwhatsapp(io);

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "public/index.html"));
});

// Error handling middleware
app.use(errorHandler);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API URL: http://localhost:${port}`);
});