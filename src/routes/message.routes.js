const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const apiKeyAuth = require("../middlewares/apiKeyAuth");
const apiLimiter = require("../utils/rateLimiter");

// send message api
router.post("/message", apiKeyAuth, apiLimiter, messageController);

module.exports = router;