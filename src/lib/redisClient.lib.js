const redis = require('redis');

const redisClient = redis.createClient({
    url: 'redis://localhost:6379', // Replace with your Redis server address
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error: ', err); // Use console.error for better error visibility
});

// Connect to the Redis server
redisClient.connect().catch(err => {
    console.error('Could not connect to Redis:', err);
});

module.exports = redisClient;