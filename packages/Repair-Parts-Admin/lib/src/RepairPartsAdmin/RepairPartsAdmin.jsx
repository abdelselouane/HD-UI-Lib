import 'flexboxgrid/css/flexboxgrid.min.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchField from './../Elements/SearchField/SearchField';
import ListItem from './../Elements/ListItem/ListItem';
import ModalAdmin from './../Elements/ModalAdmin/ModalAdmin';
import InputFieldAdmin from './../Elements/InputFieldAdmin/InputFieldAdmin';
import { searchParts, updateParts, createParts, getAllBrands, getAllSuppliers } from './../Services/RepairPartsAdmin.Service';


export class RepairPartsAdmin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      term: '',
      partNumberInput: { 
        value: '', 
        error: false, 
        msg: ''
      },
      descriptionInput: { 
        value: '', 
        error: false, 
        msg: ''
      },
      brandInput: { 
        value: '', 
        error: false, 
        msg: ''
      },
      supplierInput: { 
        value: '', 
        error: false, 
        msg: ''
      },
      cost: {
        value: '',
        error: false,
        msg: ''
      },
      parts: [],
      selectedPart: {},
      brands: [],
      selectedBrand: {},
      brandsDropDown: [],
      suppliers: [],
      selectedSupplier: {},
      suppliersDropDown: [],
      showEditModal: false,
      showSuccessModal: false,  
      showFailureModal: false,
      showAddPartModal: false,
      isLoading: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResetSearch = this.handleResetSearch.bind(this);
    this.handleEditPart = this.handleEditPart.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handlePartNumberChange = this.handlePartNumberChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSaveItem = this.handleSaveItem.bind(this);
    this.handlePartUpdate = this.handlePartUpdate.bind(this);
    this.handleAddPart = this.handleAddPart.bind(this);
    this.handleSavePart = this.handleSavePart.bind(this);
    this.handleInputFilter = this.handleInputFilter.bind(this);
    this.handleSelectedRow = this.handleSelectedRow.bind(this);
  }

  handleSearch() {
    if (this.state.term!==''){
      const apiUrl = `${this.props.partsServiceUrl}/parts/supplier/${this.state.term}`;
      searchParts(apiUrl)
        .then(res => {
          this.setState({ parts: res, isLoading: false });
        })
        .catch(error => {      
          this.setState({ showFailureModal: true });
        });
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleAllBrands = async () => {
    const apiUrl = `${this.props.partsServiceUrl}/brands`;
    try {
      const brands = await getAllBrands(apiUrl);
      this.setState({ brands });   
    } catch (error) {
      this.setState({ showFailureModal: true });
    }
  }

  handleAllSuppliers = async () => {
    const apiUrl = `${this.props.partsServiceUrl}/suppliers`;
    try {
      const suppliers = await getAllSuppliers(apiUrl);
      this.setState({ suppliers });
    } catch (error) {
      this.setState({ showFailureModal: true });
    }
  }

  handlePartUpdate(){
    const { selectedPart, cost, userId } = this.state;
    const payload = {
      brandNbr: selectedPart.brandNbr,
      cost: cost.value,
      partNbr: selectedPart.partNbr,
      supplierNbr: selectedPart.supplierNbr,
      userId: userId
    };
    const params = `?brandNbr=${payload.brandNbr}&cost=${payload.cost}&partNbr=${payload.partNbr}&supplierNbr=${payload.supplierNbr}&userId=${payload.userId}`;
    const apiUrl = `${this.props.partsServiceUrl}/parts/supplier${params}`;
    return updateParts(apiUrl)
      .then(res => {
        if (res.status === 200){
          this.setState({ showSuccessModal: true });         
        } else {
          this.setState({ showFailureModal: true });
        }
        this.handleResetSearch();
      })
      .catch(error => {      
        this.setState({ showFailureModal: true });
      });
  }

  handleCreatePart = async (payload) => {
    const params = `?brandNbr=${payload.brandNbr}&cost=${payload.cost}&partDesc=${payload.partDesc}&partNbr=${payload.partNbr}&supplierNbr=${payload.supplierNbr}&userId=${payload.userId}`;
    const apiUrl = `${this.props.partsServiceUrl}/parts/supplier${params}`;
    try {
      const res = await createParts(apiUrl);
      if (res.status === 200){
        this.setState({ showSuccessModal: true });
      } else {
        this.setState({ showFailureModal: true });
      }
      this.handleResetSearch();
    } catch ( error) {
      this.setState({ showFailureModal: true });
    }
  }

  handleOnChange(event) {
    this.setState({ term: event.target.value });
  }

  handleResetSearch(){
    this.setState({
      term: '',
      parts: [],
      cost: {
        value: '',
        error: false,
        msg: ''
      }
    });
  }

  handleModalClose() {
    this.setState({
      showEditModal: false,
      showSuccessModal: false,
      showFailureModal: false,
      showAddPartModal: false,
      brandsDropDown: [],
      suppliersDropDown: [],
      partNumberInput :{
        value: '',
        error: false,
        msg: ''
      },
      descriptionInput: {
        value: '',
        error: false,
        msg: ''
      },
      brandInput : {
        value: '',
        error: false,
        msg: ''
      },
      supplierInput: {
        value: '',
        error: false,
        msg: ''
      },
      cost: {
        value: '',
        error: false,
        msg: ''
      },
      selectedPart: {}
    });
  };

  handleEditPart(event){
    const id = event.target.id.substring(5, event.target.id.length);
    const parts = this.state.parts;
    const selected = parts.filter( part => id === part.partNbr );
    this.setState({
      showEditModal: true,
      selectedPart: selected[0]
    });
  }

  handleCostChange(event) {
    const val = event.target.value;
    if ( parseFloat(val).toFixed(2) >= 10000 ) {
      this.setState({
        cost: {
          value: val,
          error: true,
          msg: 'Please enter a valid cost $0.00'
        }
      });
    } else {    
      this.setState( prevState => {
        return { cost: {
          value: val,
          error: false,
          msg: ''
        }
        };
      });
    }
  }

  handlePartNumberChange(event){
    const val = event.target.value;
    this.setState({
      partNumberInput: {
        value: val,
        error: false,
        msg: ''
      }
    });
  }

  handleDescriptionChange(event){
    const val = event.target.value;
    this.setState({
      descriptionInput: {
        value: val,
        error: false,
        msg: ''
      }
    });
  }

  handleSaveItem() {
    if (this.state.cost.value !== ''){
      this.setState( prevState => {
        const { cost, selectedPart } = prevState;
        return {
          selectedPart: {
            cost: parseFloat(cost.value).toFixed(2),
            brandName: selectedPart.brandName,
            brandNbr: selectedPart.brandNbr,
            partDesc: selectedPart.partDesc,
            partNbr: selectedPart.partNbr,
            supplierName: selectedPart.supplierName,
            supplierNbr: selectedPart.supplierNbr
          }
        };
      });
      this.handlePartUpdate();
    }
  }

  handleAddPart(){
    this.setState({
      showAddPartModal: true
    });
    this.handleAllBrands();    
    this.handleAllSuppliers();
  }

  handleInputFilter(event){
    const elementType = event.target.id;
    const term = event.target.value;
    let dropDownItem = [];
    const {
      brands,
      suppliers
    } = this.state;
    if (term !== ''){    
      dropDownItem = (elementType === 'brand')  ?
        brands.filter( (brand) => brand.brandNumber.toString().toLowerCase().includes(term.toLowerCase()) 
        || brand.brandName.toLowerCase().includes(term.toLowerCase()))
        :
        suppliers.filter( (supplier) => supplier.supplierNumber.toString().toLowerCase().includes(term.toLowerCase()) 
        || supplier.supplierName.toLowerCase().includes(term.toLowerCase()));
      
    }
    this.setState({
      [`${elementType}Input`]: { value: term, error: false, msg: '' },
      [`${elementType}sDropDown`]: dropDownItem
    });  
  }

  handleSelectedRow(obj) {
    const elementType = obj.brandNumber !== undefined ? 'brand' : 'supplier';
    this.setState({ 
      [`${elementType}Input`]: {
        value: `${obj[`${elementType}Number`]} - ${obj[`${elementType}Name`]}`,
        error: false,
        msg: ''
      },
      [`${elementType}sDropDown`]:[]
    });
  }

  handleSavePart() {
    const {
      partNumberInput,
      descriptionInput,
      brandInput,
      supplierInput,
      cost,
      brands,
      suppliers
    } = this.state;

    let brandInfo = brandInput.value.split(' - ');
    const brand = brands.filter( brand => parseInt(brandInfo[0]) === brand.brandNumber && brandInfo[1] === brand.brandName);
    let supplierInfo = supplierInput.value.split(' - ');
    const supplier = suppliers.filter( supplier => parseInt(supplierInfo[0]) === supplier.supplierNumber && supplierInfo[1] === supplier.supplierName);
  
    if (!brand.length > 0){
      this.setState( prevState => {
        return { brandInput:{
          value: prevState.brandInput.value,
          error: true,
          msg : 'Please select valid Brand.'
        }
        };
      });
    } else if (!supplier.length > 0){
      this.setState( prevState => {
        return { supplierInput:{
          value: prevState.supplierInput.value,
          error: true,
          msg : 'Please select valid Supplier.'
        }
        };
      });
    } else if (cost.value === ''){
      this.setState({
        cost:{
          value: '',
          error: true,
          msg : 'Please enter a valid Cost.'
        }
      });
    } else if (partNumberInput.value === ''){
      this.setState(prevState => {
        return { partNumberInput: {
          value: prevState.partNumberInput.value,
          error: true,
          msg : 'Please enter a valid Part Number.'
        }
        };
      });
    } else if (descriptionInput.value === ''){
      this.setState(prevState => {
        return { descriptionInput: {
          value: prevState.descriptionInput.value,
          error: true,
          msg : 'Please enter a valid Description.'
        }
        };
      });
    } else {
      this.handleModalClose();
      this.setState({
        selectedPart: {
          brandName: brandInfo[1],
          brandNbr: parseInt(brandInfo[0]),
          cost: parseFloat(cost.value).toFixed(2),
          partDesc: descriptionInput.value,
          partNbr: partNumberInput.value,
          supplierName: supplierInfo[1],
          supplierNbr: parseInt(supplierInfo[0]),
          userId: this.state.userId
        }
      });
      const payload = {
        brandNbr: parseInt(brandInfo[0]),
        cost: parseFloat(cost.value).toFixed(2),
        partDesc: descriptionInput.value,
        partNbr: partNumberInput.value,
        supplierNbr: parseInt(supplierInfo[0]),
        userId: this.state.userId
      };
      this.handleCreatePart(payload);
    }
  }

  render() {

    const {
      term,
      parts, 
      brandsDropDown,
      suppliersDropDown,
      selectedPart,
      brandInput,
      supplierInput,
      partNumberInput,
      descriptionInput,
      cost,
      showEditModal,
      showSuccessModal,
      showFailureModal,
      showAddPartModal
    } = this.state;
    
    const searchFieldProps = {
      input: {
        id: 'searchField',
        type: 'text',
        placeholder: "Enter part number to update an existing part",
        value: term,
        onChange: this.handleOnChange,
        onKeyPress: this.handleKeyPress
      },
      action: {
        id: 'searchLink',
        onClick: this.handleSearch,
        text: "Search"
      }
    };

    const listItemProps = {
      title: "Part #",
      columns: [{
        className: "col-lg-2",
        label: "Brand",
        key: "brandName"
      },
      {
        className: "col-lg-3",
        label: "Description",
        key: "partDesc"
      },
      {
        className: "col-lg-2",
        label: "Supplier",
        key: "supplierName"
      },
      {
        className: "col-lg-2",
        label: "Cost",
        key: "cost"
      },
      {
        className: "col-lg-3",
        actions: true
      }],
      actions: [{
        text: "Edit Part",
        className: "button md",
        onClick: this.handleEditPart
      }]
    };

    const costFieldProps = {
      field: {
        type: "number",
        id: "cost",
        name: "cost",
        pattern: "^\d*(\.\d{0,2})?$",
        value: cost.value,
        required: "required",
        placeholder: "Enter cost here",
        onChange: this.handleCostChange
      },
      label: {
        text: "Cost"
      },
      fieldError: {
        flag: cost.error ? cost.error : false,
        msg: cost.msg ? cost.msg : ''
      }
    };

    const partNumberFieldProps = {
      field: {
        required: "required",
        id:"partNumberInput",
        name:"partNumberInput",             
        placeholder:"Enter Part Number",
        title:"Part Number",
        value: partNumberInput.value,
        onChange: this.handlePartNumberChange,
        type:"text"   
      },
      label: {
        text: "Part Number"
      },
      fieldError: {
        flag: partNumberInput.error ? partNumberInput.error : false,
        msg: partNumberInput.msg ? partNumberInput.msg : ''
      }
    };

    const descriptionFieldProps = {
      field: {
        required:"required",
        id:"descriptionInput",
        name:"descriptionInput",             
        placeholder:"Enter Description",
        title:"Description",
        value:descriptionInput.value,
        onChange:this.handleDescriptionChange,
        type:"text"   
      },
      label: {
        text: "Description"
      },
      fieldError: {
        flag: descriptionInput.error ? descriptionInput.error : false,
        msg: descriptionInput.msg ? descriptionInput.msg : ''
      }
    };

    const brandFieldProps = {
      field: {
        required: "required",
        id:"brand",
        name:"brandInput",
        onChange:this.handleInputFilter,
        placeholder:"Enter Brand",
        title:"Brand",
        type:"text",
        value: brandInput.value     
      },
      label: {
        text: "Brand"
      },
      fieldError: {
        flag: brandInput.error ? brandInput.error : false,
        msg: brandInput.msg ? brandInput.msg : ''
      },
      dropDownData: brandsDropDown,
      toDisplay: ['brandNumber', 'brandName'],
      zIndex: true,
      handleSelectedItem: this.handleSelectedRow,
    };

    const supplierFieldProps = {
      field: {
        required: "required",
        id:"supplier",
        name:"supplierInput",
        onChange:this.handleInputFilter,
        placeholder:"Enter Supplier",
        title:"Supplier",
        type:"text",
        value: supplierInput.value     
      },
      label: {
        text: "Supplier"
      },
      fieldError: {
        flag: supplierInput.error ? supplierInput.error : false,
        msg: supplierInput.msg ? supplierInput.msg : ''
      },
      dropDownData: suppliersDropDown,
      toDisplay: ['supplierNumber', 'supplierName'],
      zIndex: brandsDropDown.length > 0 ? false : true,
      handleSelectedItem: this.handleSelectedRow,
    };

    const modalProps = {
      modal: {
        id: "modalID"
      },
      toolBar: {
        title: `Edit cost of part #${selectedPart.partNbr}`,
        onClick: this.handleModalClose
      },
      content: <InputFieldAdmin {...costFieldProps} />,
      actions: [{
        id:"close",
        onClick: this.handleModalClose,
        className: "button",
        text: "Cancel"
      },
      {
        id:"save",
        onClick: this.handleSaveItem,
        className: `button primary ${ (cost.error || cost.value === '') && "disabled"}`,
        text: "Save Item"
      }],
      styles: {
        width: "500px",
        height: !cost.error ? "260px" : "280px"
      }
    };

    const modalSuccessProps = {
      modal: {
        id: "modalSuccessID",
        type: "success"
      },
      toolBar: {
        title: "Part Saved",
        onClick: this.handleModalClose
      },
      content: ( selectedPart &&
        <div>
          <h3>Part #{selectedPart.partNbr}</h3>
          <div className="row">
            <div className="col-lg-3">
              <label>Brand</label><br/>
              <strong>{selectedPart.brandName}</strong>
            </div>
            <div className="col-lg-3">
              <label>Description</label><br/>
              <strong>{selectedPart.partDesc}</strong>
            </div>
            <div className="col-lg-3">
              <label>Supplier</label><br/>
              <strong>{selectedPart.supplierName}</strong>
            </div>
            <div className="col-lg-3">
              <label>Cost</label><br/>
              <strong>{`$${selectedPart.cost}`}</strong>
            </div>
          </div>
        </div>
      ),
      actions: [{
        onClick: this.handleModalClose,
        className: "button",
        text: "Close"
      }],
      styles: {
        width: "600px",
        height: "300px"
      }
    };

    const modalFailureProps = {
      modal: {
        id: "modalFailureID",
        type: "failure"
      },
      toolBar: {
        title: "Error",
        onClick: this.handleModalClose
      },
      content: (
        <div>
          <h3>Part #{selectedPart.partNbr}</h3>
          <div className="row">
            <div className="col-lg-12">
              <h5>ERROR: Please contact the repair team.</h5>
            </div>
          </div>
        </div>
      ),
      actions: [{
        onClick: this.handleModalClose,
        className: "button",
        text: "Close"
      }],
      styles: {
        width: "600px",
        height: "300px"
      }
    };

    const modalAddPartProps = {
      modal: {
        id: "modalAddPartID"
      },
      toolBar: {
        title: "New Part",
        onClick: this.handleModalClose
      },
      content: (
        <div>
          <InputFieldAdmin {...partNumberFieldProps} />
          <InputFieldAdmin {...descriptionFieldProps} />
          <InputFieldAdmin {...brandFieldProps} />
          <InputFieldAdmin {...supplierFieldProps} />
          <InputFieldAdmin {...costFieldProps} />
        </div>
      ),
      actions: [{
        onClick: this.handleModalClose,
        className: "button",
        text: "Cancel"
      },
      {
        id: 'savePart',
        onClick: this.handleSavePart,
        className: "button primary",
        text: "Save Part"
      }],
      styles: {
        top: "20%",
        width: "500px",
        height: "600px"
      }
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1 style={ {textAlign: 'center', color: '#444'} }>Parts Admin</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <button
              style={ { margin: '0' } }
              className="button primary md"
              id="addNewPart"
              onClick={this.handleAddPart}
            >
              Add New Part
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <SearchField {...searchFieldProps} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            { parts &&
                  parts.map( part => {
                    return (
                      <ListItem
                        data={part}
                        key={part.partNbr}
                        {...listItemProps}
                      />
                    );
                  })
            }
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ModalAdmin
              show={showEditModal}
              {...modalProps}
            />
            <ModalAdmin
              show={showSuccessModal}
              {...modalSuccessProps}
            />
            <ModalAdmin
              show={showFailureModal}
              {...modalFailureProps}
            />
            <ModalAdmin
              show={showAddPartModal}
              {...modalAddPartProps}
            />
          </div>
        </div>
      </div>
    );
  }

}

RepairPartsAdmin.propTypes = {
  partsServiceUrl: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

export default RepairPartsAdmin;
