import { BrowserRouter, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState(
    Cookies.get('username') ? Cookies.get('username') : 'guest'
  );
  const [userId, setUserId] = useState(0);
  const [csrftoken, setCsrftoken] = useState('');

  // Get csrftoken
  useEffect(() => {
    setCsrftoken(Cookies.get('csrftoken'));
  }, [username]);

  // Get User
  const getUser = useCallback(() => {
    const getUserFromServer = async () => {
      const userFromServer = await fetchUser();
      Cookies.set('username', userFromServer[0].username, { expires: 14 });
    };
    getUserFromServer();
  }, []);

  // Fetch User
  const fetchUser = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/todos/v1/users/`,
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    );

    const data = await res.json();

    if (!data.detail) {
      setUserId(data[0].id);
      setUsername(data[0].username);
    }

    return data;
  };

  // Get Todos
  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer);
    };
    if (username !== 'guest') {
      getTodos();
    }
  }, [username]);

  // Fetch Todos
  const fetchTodos = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/todos/v1/?ordering=pk`,
      {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    );
    const data = await res.json();

    return data;
  };

  // Fetch Todo
  const fetchTodo = async id => {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/todos/v1/${id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'include'
      }
    );
    const data = await res.json();

    return data;
  };

  // Add Todo
  const addTodo = async todo => {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/todos/v1/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      credentials: 'include',
      body: JSON.stringify(todo)
    });
    const data = await res.json();

    setTodos([...todos, data]);
  };

  // Delete todo
  const deleteTodo = async id => {
    await fetch(`${process.env.REACT_APP_API_HOST}/api/todos/v1/${id}/`, {
      headers: { 'X-CSRFToken': csrftoken },
      credentials: 'include',
      method: 'DELETE'
    });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle complete
  const toggleComplete = async id => {
    const todoToToggle = await fetchTodo(id);
    const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };

    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/todos/v1/${id}/`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'include',
        body: JSON.stringify(updatedTodo)
      }
    );

    const data = await res.json();

    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: data.completed } : todo
      )
    );
  };

  return (
    <BrowserRouter>
      <Navbar
        user={username}
        setUsername={setUsername}
        csrftoken={csrftoken}
        setTodos={setTodos}
        setShowAddTodo={setShowAddTodo}
      />
      <div className="container">
        <Route
          exact
          path="/signup"
          component={() => <Signup getUser={getUser} />}
        />
        <Route
          exact
          path="/login"
          component={() => <Login getUser={getUser} />}
        />
        <Route
          exact
          path="/"
          component={() => (
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              addTodo={addTodo}
              userId={userId}
              showAddTodo={showAddTodo}
              setShowAddTodo={setShowAddTodo}
              username={username}
            />
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
