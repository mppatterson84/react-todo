import PropTypes from 'prop-types';

const Button = ({ color, text, onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={`btn btn-${color}`}>
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: 'secondary'
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
