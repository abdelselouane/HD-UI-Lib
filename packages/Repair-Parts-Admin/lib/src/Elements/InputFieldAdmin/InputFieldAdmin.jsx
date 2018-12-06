import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputFieldAdmin = (props) => {
  const { field, label, fieldError, dropDownData, toDisplay, zIndex, handleSelectedItem } = props;
  
  const DropDown = styled.div`
      position: absolute;
      border: 1px solid;
      border-color: #ccc;
      width: 100%;
      height: auto;
      background-color: #fff;
      z-index: ${props.zIndex && "1"};
    `;

  return (
    <div className={`text-input-container ${fieldError.flag && 'error'}`}>
      <input
        {...field}
      />
      { label && <label htmlFor={field.id}>{label.text}</label> }
      { dropDownData && (
        <DropDown zIndex={zIndex} >
          <table className="standard-table alternating-rows" style={{margin:'0'}}>
            <tbody>
              { dropDownData && 
                dropDownData.map( (item, index) => {
                  return (
                    <tr
                      key={index} 
                      onClick={() => handleSelectedItem(item)}
                    >
                      <td>{item[toDisplay[0]]} - {item[toDisplay[1]]}</td>  
                    </tr>); 
                })
              }               
            </tbody>
          </table>
        </DropDown>
      )}
      { fieldError.flag && <span style={{color:"#ed1c24"}}>{fieldError.msg}</span> }
    </div>
  )
}

InputFieldAdmin.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.object,
  fieldError: PropTypes.object
}

export default InputFieldAdmin;