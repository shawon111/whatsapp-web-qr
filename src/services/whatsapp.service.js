const { Client, LocalAuth } = require('whatsapp-web.js');
const logger = require('../utils/logger');

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
        logger.info('QR RECEIVED', qr);
        io.emit('qr', qr);
    });

    client.on('authenticated', () => {
        state = 'authenticated';
        logger.info('Client is authenticated!');
        io.emit('authenticated', 'Client is authenticated!');
    });

    client.on('ready', () => {
        state = 'ready';
        logger.info('Client is ready!');
        io.emit('ready', 'Client is ready!');
    });

    client.on('auth_failure', (msg) => {
        state = 'auth_failure';
        logger.error('Authentication failure:', msg);
        io.emit('auth_failure', 'Authentication failure');
    });

    client.on('disconnected', (reason) => {
        state = 'disconnected';
        logger.info('Client was logged out:', reason);
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
        
        
        const result = await client.sendMessage(chatId, message);
        logger.info(`Message sent to ${number}`);
        return result;
    } catch (error) {
        logger.error('Error sending message:', error.message || error);
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