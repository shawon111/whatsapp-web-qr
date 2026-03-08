const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const apiKeyAuth = require("../middlewares/apiKeyAuth");

// POST /api/message
router.post("/message", apiKeyAuth, messageController);

module.exports = router;