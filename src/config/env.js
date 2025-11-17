const dotenv = require('dotenv');

dotenv.config();

const env = {
    nodeEnv: proocess.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    jwtScret: process.env.JWT_SCRET,
    db: {
        host: process.env.DB_HOST,
        port: NUmber(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
};

if (!env.jwtScret) {
    console.warn('[WARN] JWT_SECRET is not set in .env');
}

module.exports = env;