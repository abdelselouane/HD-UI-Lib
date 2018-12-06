import 'flexboxgrid/css/flexboxgrid.min.css';
import React from 'react';
import SearchField from '../Elements/SearchField/SearchField';
import DropdownField from '../Elements/DropdownField/DropdownField';

export class RepairWorkOrder extends React.Component {
    
    state = {
        selectedItem: {
            id: 0,
            value: '',
            option: 'Work Order'
        },
        dropdownOpen: false
    }

    handleSelectedItem = (event) => {
        this.setState({
          selectedItem: {
            id: parseInt(event.target.value),
            value: event.target.id,
            option: event.target.title
          }
        });
        this.handleDropdownClose();
    }

    handleDropdownClose = () => {
        this.setState({
          dropdownOpen: false
        });
    }

    handleDropdownOpen = () => {
        this.setState({
          dropdownOpen: true
        });
    }

    render () {

        const dropdownProps = {
            id: 'dropDown',
            label: '',
            dropdownOpen: this.state.dropdownOpen,
            selectedItem: this.state.selectedItem,
            handleSelectedItem: this.handleSelectedItem,
            // handleDropdownOpen: this.handleDropdownOpen,
            items: [{
                id: 0,
                value: '',
                option: 'Work Order'
            }]
        }

        const searchFieldProps = {
            input: {
              id: 'searchField',
              type: 'text',
              placeholder: "#SSSSSAAAAAXXXXX",
              value: '',
              onChange: () => {}
            }
          };

        const searchBtn = {
            border: '1px solid #ccc',
            backgroundColor: '#fbfbfb',
            padding: '9px 15px',
            font: '18px',
            color: 'rgb(255, 120, 73)',
            width: '120px',
            minHeight: '46px',
            position: 'relative',
            marginTop: '22px',
            marginLeft: '-66px',
        }

        const searchBtnText = {
            textDecoration: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '500'
        }

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row center-lg">
                        <div className="col-lg-12">
                            <h1 className="workOrders-text">Work Order Search</h1>
                        </div>
                    </div>
                    <div className="row center-lg">
                        <div className="col-lg-2">
                            <DropdownField {...dropdownProps} />
                        </div>
                        <div className="col-lg-6">
                            <SearchField {...searchFieldProps} />
                        </div>
                        <div className="col-lg-1">
                            <div style={searchBtn}>
                                <a style={searchBtnText}> Search </a>
                            </div>
                        </div>
                    </div>
                    <div className="row start-lg">
                        <div className="col-lg-12">
                            <br />
                            <h2>Open Work Orders</h2>
                        </div>
                    </div>
                    <div className="row end-lg">
                        <div className="col-lg-12">
                            <button className="button md primary">New Work Order</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default RepairWorkOrder;