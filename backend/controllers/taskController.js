

const pool = require('../config/db');

const getAllTasks = async (req, res) => {
    try {

        const [rows] = await pool.query(
            'SELECT * FROM tasks'
        );

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });
    }
};


const getTaskById = async (req, res) => {

    try {

        const id = req.params.id;

        const [rows] = await pool.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json(rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });

    }
};

const createTask = async (req, res) => {

    try {

        const {task} = req.body;

        const [result] = await pool.query(
            'INSERT INTO tasks(task) VALUES (?)',
            [task]
        );

        res.status(201).json({
            message: "Task created",
            id: result.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });

    }
};

const updateTask = async (req, res) => {

    try {

        const id = req.params.id;
        const { task } = req.body;

        const [result] = await pool.query(
            `UPDATE tasks
             SET task = ?
             WHERE id = ?`,
            [task, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task Updated"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

const deleteTask = async (req, res) => {

    try{
    const id = req.params.id;
    const [results] = await pool.query(
        `DELETE FROM tasks
        WHERE id = ?`,
        [id]
    )
    if (results.affectedRows === 0) {
    return res.status(404).json({
        message: "Task not found"
    });
}
    res.status(200).json({
        message: "Task Deleted"
    })
    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
    
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};