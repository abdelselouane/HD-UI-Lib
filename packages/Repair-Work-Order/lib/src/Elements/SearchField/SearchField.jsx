import React from 'react';
import PropTypes from 'prop-types';

const SearchField = ({ input }) => {

  const inputStyles = {
    marginLeft: '-66px'
  }

  return (
    <div className="text-input-container">
      <input
        {...input}
        style={inputStyles}
      />
    </div>
  );
};

SearchField.propTypes = {
  input: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  })
};

export default SearchField;
