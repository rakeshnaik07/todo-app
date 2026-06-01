const express = require('express');

const app = express();

const taskRoutes = require('./routes/taskRoutes');

const PORT = 3000;

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is Live');
});

app.use('/tasks', taskRoutes);


const pool = require('./config/db');

async function testDB() {
    try {
        const connection = await pool.getConnection();

        console.log('Database Connected Successfully');

        connection.release();
    } catch (error) {
        console.log(error.message);
    }
}

testDB();

app.listen(PORT, () => {
    console.log(`Todo server is running on http://localhost:${PORT}`);
});