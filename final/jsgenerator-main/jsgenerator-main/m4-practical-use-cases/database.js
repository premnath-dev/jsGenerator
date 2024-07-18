const mysql = require('mysql2/promise');

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}

module.exports = createConnection;
