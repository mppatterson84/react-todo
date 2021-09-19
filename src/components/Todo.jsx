import { FaTrashAlt } from 'react-icons/fa';

const Todo = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <div className="todo mt-1 p-2">
      <button className="delete btn p-0" onClick={() => deleteTodo(todo.id)}>
        <FaTrashAlt />
      </button>
      <span>
        <input
          type="checkbox"
          name="completed"
          id="completedCheck"
          onChange={() => toggleComplete(todo.id)}
          checked={todo.completed ? todo.completed : false}
        />
      </span>
      <h4>{todo.title}</h4>
      <p>{todo.detail}</p>
      <p>{todo.due_by}</p>
    </div>
  );
};

export default Todo;
