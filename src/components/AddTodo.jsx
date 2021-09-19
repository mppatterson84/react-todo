import { useState } from 'react';

const AddTodo = ({ addTodo, userId }) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [completed, setCompleted] = useState(false);
  const [due_by, setDueBy] = useState('');
  const [author, setAuthor] = useState(userId);

  const onSubmit = e => {
    e.preventDefault();

    if (!title) {
      alert('Please add a todo.');
      return;
    }

    addTodo({ title, detail, due_by, completed, author });

    setTitle('');
    setDetail('');
    setCompleted(false);
    setDueBy('');
    setAuthor(userId);
  };

  return (
    <form className="add-todo-form" onSubmit={onSubmit}>
      <div className="form-group mt-2">
        <label htmlFor="todo">Todo</label>
        <input
          type="text"
          id="todo"
          placeholder="Add Todo"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="detail">Detail</label>
        <input
          type="text"
          id="detail"
          placeholder="Add some details."
          className="form-control"
          value={detail}
          onChange={e => setDetail(e.target.value)}
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="datetime">Due Date & Time</label>
        <input
          type="datetime-local"
          id="datetime"
          className="form-control"
          value={due_by}
          onChange={e => setDueBy(e.target.value)}
          required
        />
      </div>
      <input type="submit" value="Save Todo" className="btn btn-success my-2" />
    </form>
  );
};

export default AddTodo;
