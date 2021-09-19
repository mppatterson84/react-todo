import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Navbar = ({ user, setUsername, csrftoken }) => {
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
    // setTodos([]);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Todo
        </Link>
        <span className="navbar-text me-2 mb-2 ms-auto">Welcome, {user}</span>
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
