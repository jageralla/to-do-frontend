import Todo from "../components/Todo";
import api from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterNavItem from "../components/FilterNavItem";
import Spinner from "../components/Spinner";
import NoTodosMessage from "../components/NoToDosMessage";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTodos();
    getUser();
  }, []);

  const getTodos = async () => {
    try {
      const response = await api.get("/api/todos/");
      setTodos(response.data);
    } catch (error) {
      alert("You have been logged out. Please Login again.");
    }
  };

  const createTodo = async (e) => {
    setLoading(true);
    e.preventDefault();

    const due_date = "2024-09-09";
    try {
      const response = await api.post("/api/todos/", { task: todo, due_date });
      if (response.status === 201) {
        setTodo("");
        setFilter("all");
        getTodos();
      }
    } catch (error) {
      alert("You have been logged out. Please Login again.");
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await api.get("/api/user/");
      if (response.status === 200) {
        setUser(response.data.name);
      }
    } catch (error) {
      alert("You have been logged out. Please Login again."); //
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.is_completed;
    if (filter === "completed") return todo.is_completed;
    return true;
  });

  const deleteTodo = async (id) => {
    try {
      const response = await api.delete(`/api/todos/delete/${id}/`);
      if (response.status === 204) {
        getTodos();
      }
    } catch (error) {
      alert("You have been logged out. Please Login again.");
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    try {
      const response = await api.patch(`/api/todos/${id}/complete/`, {
        is_completed: !todo.is_completed,
      });
      if (response.status === 200) {
        getTodos();
      }
    } catch (error) {
      alert("You have been logged out. Please Login again.");
    }
  };

  return (
    <>
      <section className="to-do-section">
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>Hello, {user}!</h4>
            </div>
            <div className="col-auto">
              <Link to="/logout">
                <button className="btn btn-logout">Logout</button>
              </Link>
            </div>
            <div className="task-field">
              <input
                className="input-field"
                type="text"
                placeholder="New Task..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                required
              />
              <button
                className="btn task-entry-button"
                disabled={todo === "" ? true : false}
                onClick={createTodo}
              >
                {loading ? <Spinner /> : "Enter"}
              </button>
            </div>
            <div className="to-do-information">
              <ul className="todo-nav">
                <FilterNavItem
                  filter="all"
                  currentFilter={filter}
                  setFilter={setFilter}
                >
                  All ({todos.length})
                </FilterNavItem>
                <FilterNavItem
                  filter="active"
                  currentFilter={filter}
                  setFilter={setFilter}
                >
                  Active (
                  {todos.filter((todo) => todo.is_completed === false).length})
                </FilterNavItem>
                <FilterNavItem
                  filter="completed"
                  currentFilter={filter}
                  setFilter={setFilter}
                >
                  Completed (
                  {todos.filter((todo) => todo.is_completed === true).length})
                </FilterNavItem>
              </ul>
              <ul className="to-do-information_counter">
                {filteredTodos.length === 0 && (
                  <NoTodosMessage filter={filter} />
                )}
                {filteredTodos.map((todo) => (
                  <Todo
                    todo={todo}
                    key={todo.id}
                    onDelete={deleteTodo}
                    onToggleComplete={toggleComplete}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
