import { Link } from 'react-router-dom';
import Todos from './Todos';
import Header from './Header';
import AddTodo from './AddTodo';

const TodoList = ({
  todos,
  deleteTodo,
  toggleComplete,
  addTodo,
  userId,
  showAddTodo,
  setShowAddTodo,
  username
}) => {
  return (
    <div className="card">
      {username !== 'guest' ? (
        <Header
          addTodo={() => setShowAddTodo(!showAddTodo)}
          showAddTodo={showAddTodo}
        />
      ) : (
        <h1>Todo</h1>
      )}
      {showAddTodo && (
        <AddTodo
          addTodo={addTodo}
          userId={userId}
          setShowAddTodo={setShowAddTodo}
        />
      )}
      {todos.length > 0 ? (
        <Todos
          todos={todos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ) : username !== 'guest' ? (
        <p>Todo list is empty. Add some todos.</p>
      ) : (
        <p>
          <Link to="/login">Login</Link> to manage todos.
        </p>
      )}
    </div>
  );
};

export default TodoList;
