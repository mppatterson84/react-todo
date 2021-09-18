import './App.css';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Route exact path="/signup" component={Signup} />
        {/* <Signup /> */}
        <Route exact path="/login" component={Login} />
        {/* <Login /> */}
        <Route exact path="/" component={TodoList} />
        {/* <TodoList /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
