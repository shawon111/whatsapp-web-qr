const messageQueue = require("../queues/messageQueue");
const { getState, sendMessage } = require("../services/whatsapp.service");
const sanitizeNumber = require("../utils/numberFormatter");

const messageController = async (req, res, next) => {
    try {
        const { message } = req.body;
        const { sanitizedNumber } = req;

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