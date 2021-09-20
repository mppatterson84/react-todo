import { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const Login = ({ getUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  const loginUser = async e => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/todos/v1/rest-auth/login/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await res.json();

    if (data.key) {
      setRedirect(true);
      getUser();
      console.clear();
    } else {
      setLoginStatus(false);
      setUsername('');
      setPassword('');
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="card my-3 mx-auto p-2">
      <form onSubmit={loginUser}>
        <h3 className="mb-3 fw-normal">Log In</h3>
        {loginStatus === false && <p>Login failed. Please try again.</p>}
        <input
          type="text"
          placeholder="Username"
          className="form-control mb-2"
          required
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className="w-100 btn btn-primary">
          Log In
        </button>
      </form>
      <Link to="/signup" className="m-2">
        Create an account
      </Link>
    </div>
  );
};

export default Login;
