const { getState } = require("../services/whatsapp.service");
const sanitizeNumber = require("../utils/numberFormatter");

const validateMessageRequest = (req, res, next) => {
    const { number, message } = req.body;
    try {
        // validations
        if (!number || !message) {
            throw new Error("Missing 'number' or 'message' in request body");
        }

        if (typeof number !== "string" || typeof message !== "string") {
            throw new Error("Number and message must be strings");
        }

        if (!message.trim()) {
            throw new Error("Message cannot be empty");
        }
        if (getState() !== 'ready') {
            throw new Error("WhatsApp client is not ready");
        }

        const sanitizedNumber = sanitizeNumber(number);

        // number format validation
        if (!/^\d{10,15}$/.test(sanitizedNumber)) {
            throw new Error("Invalid phone number format");
        }
        req.sanitizedNumber = sanitizedNumber;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = validateMessageRequest;