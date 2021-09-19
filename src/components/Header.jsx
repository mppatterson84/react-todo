import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, addTodo, showAddTodo }) => {
  return (
    <div className="d-flex justify-content-between">
      <h1>{title}</h1>
      <Button
        color={showAddTodo ? 'danger' : 'primary'}
        text={showAddTodo ? 'Close' : 'Add'}
        onClick={addTodo}
      />
    </div>
  );
};

Header.defaultProps = {
  title: 'Todos'
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
