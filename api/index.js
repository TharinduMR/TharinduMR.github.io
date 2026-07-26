// Vercel Serverless Function Entry Point
// Wraps the Express app from chatbot-backend for Vercel's serverless environment
const app = require('../chatbot-backend/server.js');

module.exports = app;
