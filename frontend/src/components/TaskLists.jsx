import { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await axios.post("http://localhost:3000/tasks", {
        task: newTask,
      });

      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id) => {
    if (!editTask.trim()) return;

    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, {
        task: editTask,
      });

      setEditingId(null);
      setEditTask("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id}>
          {editingId === task.id ? (
            <>
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />

              <button onClick={() => updateTask(task.id)}>
                Save
              </button>

              <button
                onClick={() => {
                  setEditingId(null);
                  setEditTask("");
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>{task.task}</p>

              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditTask(task.task);
                }}
              >
                Edit
              </button>

              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;