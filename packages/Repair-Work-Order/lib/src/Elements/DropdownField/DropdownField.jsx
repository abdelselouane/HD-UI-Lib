import React from 'react';
import PropTypes from 'prop-types';

const DropdownField = ({ id, label, selectedItem, items, handleSelectedItem, dropdownOpen }) => (
<React.Fragment>
<div className={`dropdown-list ${dropdownOpen && "dropdown-opened"}`} 
  id={id}
  style={{ marginTop: '22px'}}
>
  <label>{label}</label>
  <div className="dropdown-label"
    tabIndex="0"
    // onClick={handleDropdownOpen}
  >
    {selectedItem.option}
  </div>
  <div className="dropdown-outer-list">
    <ul className="dropdown-inner-list">
      {
        items.map( (item, index) =>
          (<li
              aria-selected={selectedItem.id === index} 
              className="dropdown-list-item" 
              id={item.value} 
              key={index}
              onClick={ handleSelectedItem }
              tabIndex="-1"
              title={item.option}
              value={item.id}
            >
            {item.option}
          </li>)
        )
      }
    </ul>
  </div>
</div>

</React.Fragment>);

DropdownField.prototype = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  dropdownOpen: PropTypes.bool.isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string,
    option: PropTypes.string.isRequired
  }).isRequired,
  items: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string,
    option: PropTypes.string.isRequired
  }).isRequired,
  handleSelectedItem: PropTypes.func.isRequired,
  handleDropdownOpen: PropTypes.func.isRequired
};

export default DropdownField;