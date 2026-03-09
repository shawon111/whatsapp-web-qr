const messageQueue = require("../queues/messageQueue");
const logger = require("./logger");

const startQueueMonitor = () => {
setInterval(() => {
  logger.info("Queue Status", {
    waiting: messageQueue.size,
    running: messageQueue.pending
  });
}, 5000);
}

module.exports = startQueueMonitor;