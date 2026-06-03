import { useNavigate } from "react-router-dom";
import { CheckSquare, LogOut } from "lucide-react";
import TaskList from "../components/TaskLists";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <header className="navbar">
        <div className="container navbar-content">
          <div className="brand">
            <CheckSquare size={22} />
            <span>TaskFlow</span>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="container">
        <section className="dashboard-header">
          <h1>My Tasks</h1>

          <p>
            Organize your work with a clean,
            distraction-free workflow.
          </p>
        </section>

        <div className="card dashboard-card">
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;