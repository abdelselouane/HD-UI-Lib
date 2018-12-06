import React from 'react';
import PropTypes from 'prop-types';

const ListItem = (props) => {

  const {
    title,
    data,
    actions,
    columns
  } = props;
  
  return (
    <div
      className="card"
      style={{marginTop: "20px", width: "100%"}}>
      <div className="card-body">
        <h2
          className="card-title"
          style={{color:"#f96302"}}
        >{title}{data.partNbr}</h2>
        <div className="row">
          {
            columns.map( (column, index) => {
              return (<div
                className={column.className}
                style={ column.actions && {textAlign: 'right'} }
                key={index} >
                { column.label &&
                <label>{column.label}</label>
                }
                { data[column.key] &&
                <div><strong>{column.key === 'cost' && '$'}{data[column.key]}</strong></div>
                }
                {
                  column.actions && actions.map( (action, index) => {
                    return (<button
                      className={action.className}
                      id={`part-${data.partNbr}`}
                      key={index}
                      onClick={action.onClick} >
                      {action.text}
                    </button>);
                  })
                }
              </div>);
            })
          }
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  actions: PropTypes.array,
  columns: PropTypes.array
};

export default ListItem;