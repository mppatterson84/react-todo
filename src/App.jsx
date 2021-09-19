import { BrowserRouter, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
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
    const getUser = async () => {
      const userFromServer = await fetchUser();
      Cookies.set('username', userFromServer[0].username, { expires: 14 });
    };
    getUser();
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
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/todos/v1/`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    const data = await res.json();

    return data;
  };

  return (
    <BrowserRouter>
      <Navbar user={username} setUsername={setUsername} csrftoken={csrftoken} />
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
            />
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
