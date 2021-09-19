import Todos from './Todos';
import Header from './Header';
import AddTodo from './AddTodo';

const TodoList = ({
  todos,
  toggleComplete,
  addTodo,
  userId,
  showAddTodo,
  setShowAddTodo
}) => {
  return (
    <div className="card">
      <Header
        addTodo={() => setShowAddTodo(!showAddTodo)}
        showAddTodo={showAddTodo}
      />
      {showAddTodo && <AddTodo addTodo={addTodo} userId={userId} />}
      {todos.length > 0 ? (
        <Todos
          todos={todos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ) : (
        <p>No todos available. Add some todos.</p>
      )}
    </div>
  );
};

export default TodoList;
