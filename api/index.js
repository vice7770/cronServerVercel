import pg from 'pg';
import cors from 'cors';
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;

const { Pool } = pg;
// Connect to PostgreSQL
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

const initializeDb = async (pool) => {
  pool.on('connect', () => {
      console.log('Connected to PostgreSQL');
  });

  pool.on('error', (err) => {
      console.error('Error connecting to PostgreSQL', err);
  });
  
  return pool;
};

initializeDb(pool)

app.use(cors({ credentials: false, origin: "*" }));
app.use(express.json());

app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app