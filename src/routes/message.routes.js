const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

// POST /api/message
router.post("/message", messageController);

module.exports = router;