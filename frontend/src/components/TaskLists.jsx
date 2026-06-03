import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ClipboardList,
} from "lucide-react";
import api from "../services/api";

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
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      await api.post("/tasks", {
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
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id) => {
    if (!editTask.trim()) return;

    try {
      await api.put(`/tasks/${id}`, {
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
      <div className="task-input-section">
        <input
          className="input"
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) =>
            setNewTask(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={addTask}
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <div className="task-header">
        <h2>Tasks</h2>

        <span className="task-count">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 && (
        <div className="empty-state">
          <ClipboardList size={60} />

          <h3>No Tasks Yet</h3>

          <p>
            Create your first task and start
            organizing your work.
          </p>
        </div>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-card"
          >
            {editingId === task.id ? (
              <>
                <input
                  className="input"
                  value={editTask}
                  onChange={(e) =>
                    setEditTask(e.target.value)
                  }
                />

                <div className="task-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      updateTask(task.id)
                    }
                  >
                    <Save size={16} />
                    Save
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingId(null);
                      setEditTask("");
                    }}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="task-text">
                  {task.task}
                </p>

                <div className="task-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditingId(task.id);
                      setEditTask(task.task);
                    }}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;