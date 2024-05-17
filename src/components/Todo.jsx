/* eslint-disable react/prop-types */
//import due_date_image from "../assets/due-date.png";
const Todo = ({ todo, onDelete, onToggleComplete }) => {
  const handleCheckboxChange = () => {
    onToggleComplete(todo.id);
  };
  const formatDate = (dateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  return (
    <>
    <li className="list">
                  <div className="task-container">
                    <input type="checkbox" checked={todo.is_completed}
            onChange={handleCheckboxChange}/>
                    <span className="task" style={{
            textDecoration: todo.is_completed ? "line-through" : "none",
          }}>{todo.task}</span>
                  </div>
                  <div className="icon-background" onClick={() => onDelete(todo.id)}>
                  <i class="bi bi-trash" style={{fontSize: 18}}></i>
                  </div>
                </li>
      {/* <div className="todo-item">
        <div className="checker">
          <input
            className="task-checkbox"
            type="checkbox"
            checked={todo.is_completed}
            onChange={handleCheckboxChange}
          />
        </div>
        <span
          className="task"
          style={{
            textDecoration: todo.is_completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </span>
        <img className="due-date-image" src={due_date_image} alt="due date" />
        <span className="due-date">{formatDate(todo.due_date)}</span>
        <button className="btn" onClick={() => onDelete(todo.id)}>
          {" "}
          <i className="bi bi-trash-fill delete-icon"></i>
        </button>
      </div> */}
    </>
  );
};

export default Todo;
