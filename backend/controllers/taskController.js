

const pool = require('../config/db');

const getAllTasks = async (req, res) => {
    try {

        const userId = req.user.id;

        const [tasks] = await pool.query(
            'SELECT * FROM tasks WHERE user_id = ?',
            [userId]
        );

        res.json(tasks);

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
        const userId = req.user.id;

        const [result] = await pool.query(
            'INSERT INTO tasks(task, user_id) VALUES (?, ?)',
            [task, userId]
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

        const userId = req.user.id;
        const taskId = req.params.id;
        const {task} = req.body;

        const [result] = await pool.query(
            `UPDATE tasks
             SET task = ?
             WHERE id = ?
             AND user_id = ?`,
            [task, taskId, userId]
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
    const taskId = req.params.id;
    const userId = req.user.id;
    const [results] = await pool.query(
        `DELETE FROM tasks
        WHERE id = ?
        AND user_id = ?`,
        [taskId, userId]
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
    createTask,
    updateTask,
    deleteTask
};