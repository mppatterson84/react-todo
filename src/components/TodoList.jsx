const TodoList = ({
  todos,
}) => {
  return (
    <div className="card">
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
