import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Modal = styled.div`
  .card .card-toolbar i {
    ${props => props.modalType === 'success' && 'color: #fff !important;' }
    font-size: 20px;
    margin-top: 10px;
  }
`;

const ModalAdmin = (props) => {

  if(!props.show) {
    return null;
  }

  const {
    modal,
    toolBar,
    content,
    actions,
    styles
  } = props;

  const typeColor = modal.type === "success" ? "#4DAA58" : "#DA3832";

  const modalStyles = {
    display: 'block',
    width: styles.width,
    left: '37%',
    top: styles.top ? styles.top : '30%',
    padding: modal.type && 0
  };

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
  };

  const toolBarStyles = {
    marginBottom: 0,
    backgroundColor: modal.type && typeColor,
    padding: modal.type && "10px",
    color: modal.type && "#fff",
  }

  const actionsStyles = {
    padding: "10px",
    margin: 0
  }

  const cardContent = {
    paddingRight: '20px'
  }

  return (
    <Modal className="modal-container" style={backdropStyle} modalType={modal.type}>
      <div className="card modal" style={modalStyles} id={modal.id}>
        <div className="card-toolbar" style={toolBarStyles}>
            <span className="card-title">
                <h3>{
                    modal.type &&
                    <i className={modal.type === "success" ? "icon_check-circle-outlined" : "icon_ban"}></i>
                  }
                    {` ${toolBar.title}`}</h3>
              </span>
            <i className="icon_close" onClick={toolBar.onClick}></i>
          </div>
        <div className="card-content" style={cardContent}>
            { content }
          </div>
        <div className="card-actions right" style={actionsStyles}>
            { actions &&
            actions.map( (action, index) => {
              return (
                <button
                  id={action.id}
                  key={index}
                  className={action.className}
                  onClick={action.onClick}
                  disabled={action.disabled && "disabled"} >
                  {action.text}
                </button>
              )
            })
          }
          </div>
      </div>
    </Modal>
    );
}

ModalAdmin.propTypes = {
  modal: PropTypes.shape({
    id: PropTypes.isRequired
  }),
  toolBar: PropTypes.object,
  actions: PropTypes.arrayOf(PropTypes.object),
  styles: PropTypes.object
}

export default ModalAdmin;