    const rateLimit = require('express-rate-limit');
    const express = require('express');
    const app = express();

    // Apply to all requests
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 3, // Limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again after 15 minutes.'
    });

    // app.use(limiter);

    // Specific route with different limits
    const authLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour
        max: 5, // Limit to 5 requests per hour
        message: 'Too many authentication attempts, please try again later.'
    });

    app.post('/login', authLimiter, (req, res) => {
        // Handle login logic
        res.send('Login successful');
    });

    app.get('/', (req, res) => {
        res.send('Welcome to the API!');
    });
    app.get('/user', limiter, (req, res) => {
        res.send('Welcome to the API!');
    });

    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });