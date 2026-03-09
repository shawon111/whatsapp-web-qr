const { default: PQueue } = require('p-queue');

const messageQueue = new PQueue({
    concurrency: 1,
    interval: 1000,
    intervalCap: 3,
    carryoverConcurrencyCount: true,
});

module.exports = messageQueue;