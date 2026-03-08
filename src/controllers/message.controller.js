const { getState, sendMessage } = require("../services/whatsapp.service");

const messageController = (req, res, next) => {
    try {
        const { number, message } = req.body;
        if (!number || !message) {
            throw new Error("Missing 'number' or 'message' in request body");
        }
        if (getState() !== 'ready') {
            throw new Error("WhatsApp client is not ready");
        }
        const result = sendMessage(number, message);
        res.json({ success: true, result });
    } catch (error) {
        next(error);
    }
}

module.exports = messageController;