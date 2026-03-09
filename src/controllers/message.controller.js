const messageQueue = require("../queues/messageQueue");
const { getState, sendMessage } = require("../services/whatsapp.service");
const sanitizeNumber = require("../utils/numberFormatter");

const messageController = async (req, res, next) => {
    try {
        const { number, message } = req.body;
        if (!number || !message) {
            throw new Error("Missing 'number' or 'message' in request body");
        }
        if (getState() !== 'ready') {
            throw new Error("WhatsApp client is not ready");
        }

        const sanitizedNumber = sanitizeNumber(number);

        // Send message 
        const result = await messageQueue.add(
            () => sendMessage(sanitizedNumber, message),
            { timeout: 10000 }
        );

        res.json({ success: true, result });
    } catch (error) {
        next(error);
    }
}

module.exports = messageController;