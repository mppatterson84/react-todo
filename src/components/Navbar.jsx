import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Navbar = ({ user, setUsername, csrftoken, setTodos, setShowAddTodo }) => {
  const logout = async () => {
    await fetch(
      `${process.env.REACT_APP_API_HOST}/api/todos/v1/rest-auth/logout/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        credentials: 'include'
      }
    );

    setUsername('guest');
    Cookies.remove('username');
    setTodos([]);
    setShowAddTodo(false);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Todo
        </Link>
        <span className="navbar-text mb-2 ms-auto px-2">Welcome, {user}</span>
        <span className="navbar-text mb-2 mx-1">|</span>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-md-8">
            {user === 'guest' ? (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Log in
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={logout}>
                  Log out
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
