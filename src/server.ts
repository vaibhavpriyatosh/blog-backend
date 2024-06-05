// src/server.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import config from 'config';
import db from './knexDb/db';

// Load environment variables from .env file
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const testConnection = async () => {
    try {
        // Perform a simple query to check the connection
        await db.raw('SELECT 1+1 AS result');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        // Close the database connection
        await db.destroy();
    }
}

const value = config.get("value");

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
