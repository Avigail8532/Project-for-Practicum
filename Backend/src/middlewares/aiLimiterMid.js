const rateLimit = require('express-rate-limit');
// Define rate limiting middleware for AI-related routes
const aiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    status: 429,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});

module.exports = aiLimiter;

