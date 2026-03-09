const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const apiKeyAuth = require("../middlewares/apiKeyAuth");
const apiLimiter = require("../utils/rateLimiter");
const validateMessageRequest = require("../middlewares/validateMessageRequest");

// send message api
router.post("/message", apiKeyAuth, apiLimiter, validateMessageRequest, messageController);

module.exports = router;