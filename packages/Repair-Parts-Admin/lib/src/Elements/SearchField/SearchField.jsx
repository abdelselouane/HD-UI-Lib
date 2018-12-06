import React from 'react';
import PropTypes from 'prop-types';

const SearchField = (props) => {

  const spanStyle = {
    color: '#FF7849',
    fontSize: '20px',
    fontWeight: 500,
    float: 'right',
    padding: '5px',
    position: 'absolute',
    marginTop: '27px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginLeft: '-80px'
  };

  const {
    input,
    action
  } = props;

  return (
    <div className="text-input-container">
      <input
        {...input}
      />
      <a 
        style={spanStyle} 
        id={action.id} 
        onClick={action.onClick}
      >
      {action.text}
      </a>
    </div>
  );
};

SearchField.propTypes = {
  action: PropTypes.shape({
    text: PropTypes.string
  }),
  input: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  })
};

export default SearchField;
