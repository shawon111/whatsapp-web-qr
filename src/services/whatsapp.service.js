const { Client, LocalAuth } = require('whatsapp-web.js');

let client = null;
let lastQr = null;
let state = 'initializing';

const initwhatsapp = (io) => {
    if (client) return client;

    client = new Client({
        authStrategy: new LocalAuth(),
    })

    client.on('qr', (qr) => {
        lastQr = qr;
        state = 'waiting_for_qr';
        console.log('QR RECEIVED', qr);
        io.emit('qr', qr);
    });

    client.on('authenticated', () => {
        state = 'authenticated';
        console.log('Client is authenticated!');
        io.emit('authenticated', 'Client is authenticated!');
    });

    client.on('ready', () => {
        state = 'ready';
        console.log('Client is ready!');
        io.emit('ready', 'Client is ready!');
    });

    client.on('auth_failure', (msg) => {
        state = 'auth_failure';
        console.error('Authentication failure:', msg);
        io.emit('auth_failure', 'Authentication failure');
    });

    client.on('disconnected', (reason) => {
        state = 'disconnected';
        console.log('Client was logged out:', reason);
        client.initialize();
    });


    client.initialize();

    return client;

}

const sendMessage = async (number, message) => {
    try {
        if (!client || state !== 'ready') {
            throw new Error('WhatsApp client is not ready');
        }
        // check wrong number
        const numberId = await client.getNumberId(number);
        if (!numberId) {
            throw new Error('Invalid phone number');
        }
        const chatId = `${number}@c.us`;
        return await client.sendMessage(chatId, message);
    } catch (error) {
        console.error('Error sending message:', error.message || error);
        throw error;
    }
}

const getState = () => {
    return state;
}

module.exports = {
    initwhatsapp,
    sendMessage,
    getState,
    lastQr
};