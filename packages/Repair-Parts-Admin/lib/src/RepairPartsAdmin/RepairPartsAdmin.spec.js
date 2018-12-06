import React from 'react';
import RepairPartsAdmin from './RepairPartsAdmin';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Enzyme from 'enzyme';
import nock from 'nock';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import { consolidateStreamedStyles } from 'styled-components';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe('<RepairPartsAdmin />', () => {
  let wrapper;
  let state;
  const props = {
    partsServiceUrl: 'http://localhost:3000',
    userId: 'mock-admin'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    state = {
      userId: 'Admin',
      term: '',
      parts: [],
      cost: {
        value: '',
        error: false,
        msg: ''
      },
      selectedPart: {},
      showEditModal: false,
      showSuccessModal: false,
      showFailureModal: false,
      isLoading: false
    };
    wrapper = shallow(<RepairPartsAdmin {...props} />);
  });

  it('should render properly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should setState term on handleOnChange', () => {
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'handleOnChange');
    wrapper.setState({
      term: ''
    });
    const term = { target: { value: '123' } };
    instance.handleOnChange(term);
    expect(instance.state.term).toBe('123');
  });

  it('should call API on handleKeyPress Enter with a success status', () => {
    wrapper.setState({ term: 'mock', parts: [], isLoading: true });
    const e = { key: 'Enter' };
    const partsNock = nock(props.partsServiceUrl)
      .get('/parts/supplier/mock')
      .reply(200, function() {
        wrapper.setState({ parts: [{ partNbr: '123' }], isLoading: false });
      });

    wrapper.instance().handleKeyPress(e);
    expect(partsNock.isDone()).toBe(true);
    expect(wrapper.state().parts).toEqual([{ partNbr: '123' }]);
    expect(wrapper.state().isLoading).toBe(false);
  });

  it('should call API on handleSearch with a success status', () => {
    wrapper.setState({ term: 'mock', parts: [], isLoading: true });
    const partsNock = nock(props.partsServiceUrl)
      .get('/parts/supplier/mock')
      .reply(200, function() {
        wrapper.setState({ parts: [{ partNbr: '123' }], isLoading: false });
      });

    wrapper.instance().handleSearch();
    expect(partsNock.isDone()).toBe(true);
    expect(wrapper.state().parts).toEqual([{ partNbr: '123' }]);
    expect(wrapper.state().isLoading).toBe(false);
  });

  it('should call API on handleSearch with an error status', () => {
    wrapper.setState({ term: 'mock', parts: [], isLoading: true });
    const partsNock = nock(props.partsServiceUrl)
      .get('/parts/supplier/mock')
      .reply(500);
    wrapper.instance().handleSearch();
    expect(partsNock.isDone()).toBe(true);
  });



  it('should setstate selectedpart on handleSaveItem', () => {
    wrapper.setState({
      cost: {
        value: '2'
      },
      selectedPart: {
        brandName: 'Makita',
        brandNbr: 1001,
        cost: 1,
        partDesc: 'BLADE GAUGE, N1900B',
        partNbr: '123010-1',
        supplierName: 'MAKITA',
        supplierNbr: 29
      }
    });
    wrapper.instance().handleSaveItem();
    expect(wrapper.state().selectedPart).toEqual({
      brandName: 'Makita',
      brandNbr: 1001,
      cost: '2.00',
      partDesc: 'BLADE GAUGE, N1900B',
      partNbr: '123010-1',
      supplierName: 'MAKITA',
      supplierNbr: 29
    });
  });

  it('should change valid cost value in the state  on handleCostChange', () => {
    const cost = { target: { value: '10' } };
    wrapper.setState({
      cost: { error: false, msg: '', value: '20' }
    });
    wrapper.instance().handleCostChange(cost);
    expect(wrapper.state().cost.value).toEqual('10');
  });

  it('should check for invalid cost value in the state on handleCostChange', () => {
    const cost = { target: { value: '10345566' } };
    wrapper.instance().handleCostChange(cost);
    expect(wrapper.state().cost).toMatchObject({
      error: true,
      msg: 'Please enter a valid cost $0.00',
      value: '10345566'
    });
  });

  it('should set the showEditModal and selectedPart values in the state when handleEditPart is called', () => {
    wrapper.setState({
      showEditModal: false,
      parts: [
        {
          brandName: 'Makita',
          brandNbr: 1001,
          cost: '2.00',
          partDesc: 'BLADE GAUGE, N1900B',
          partNbr: '1',
          supplierName: 'MAKITA',
          supplierNbr: 29
        },
        {
          brandName: 'Makita',
          brandNbr: 1001,
          cost: '2.00',
          partDesc: 'BLADE, N1900B',
          partNbr: '2',
          supplierName: 'MAKITA',
          supplierNbr: 29
        }
      ],
      selectedPart: {}
    });

    let event = { target: { id: 'part-1' } };
    wrapper.instance().handleEditPart(event);
    expect(wrapper.state().showEditModal).toBe(true);
    expect(wrapper.state().selectedPart).toMatchObject({
      brandName: 'Makita',
      brandNbr: 1001,
      cost: '2.00',
      partDesc: 'BLADE GAUGE, N1900B',
      partNbr: '1',
      supplierName: 'MAKITA',
      supplierNbr: 29
    });
  });

  it('should set state variables to initial state on handleModalClose', () => {
    wrapper.setState({
      showEditModal: true,
      showSuccessModal: true,
      showFailureModal: true,
      cost: {
        value: '12',
        error: false,
        msg: ''
      },
      selectedPart: {
        brandName: 'Makita',
        brandNbr: 1001,
        cost: '2.00',
        partDesc: 'BLADE GAUGE, N1900B',
        partNbr: '1',
        supplierName: 'MAKITA',
        supplierNbr: 29
      }
    });
    wrapper.instance().handleModalClose();
    expect(wrapper.state().showEditModal).toBe(false);
    expect(wrapper.state().showSuccessModal).toBe(false);
    expect(wrapper.state().showFailureModal).toBe(false);
    expect(wrapper.state().cost.value).toEqual('');
    expect(wrapper.state().selectedPart).toMatchObject({});
  });

  it('it should set state showAddPartModal on handleAddPart', () => {
    wrapper.setState({
      showAddPartModal: false
    });
    wrapper.instance().handleAddPart();
    expect(wrapper.state().showAddPartModal).toBe(true);
  });

  it('it should setPartNumberInput on handlePartNumberChange', () => {
    wrapper.setState({
      partNumberInput: {
        value: '',
        error: false,
        msg: ''
      }
    });
    const event = { target: { value: '123' } };
    wrapper.instance().handlePartNumberChange(event);
    expect(wrapper.state().partNumberInput).toMatchObject({
      value: '123',
      error: false,
      msg: ''
    });
  });

  it('it should descriptionInput on handleDescriptionChange', () => {
    wrapper.setState({
      descriptionInput: {
        value: '',
        error: false,
        msg: ''
      }
    });
    const event = { target: { value: 'description test' } };
    wrapper.instance().handleDescriptionChange(event);
    expect(wrapper.state().descriptionInput).toMatchObject({
      value: 'description test',
      error: false,
      msg: ''
    });
  });

  it('it should reset, term, parts and cost on handleResetSearch', () => {
    wrapper.setState({
      term: '123',
      parts: [{
        partNUmber: '123'
      }],
      cost: {
        value: '12',
        error: false,
        msg: ''
      }
    });
    wrapper.instance().handleResetSearch();
    expect(wrapper.state().term).toBe('');
    expect(wrapper.state().parts).toEqual([]);
    expect(wrapper.state().cost).toMatchObject({
      value: '',
      error: false,
      msg: ''
    });
  });

  it('it should set state brandsDropdown on handleInputFilter', () => {
    const event = { target: { id: 'brand', value: '100' } };
    
    wrapper.setState({
      brands:[{
        brandNumber: 1001,
        brandName: 'Makita'
      }],
      brandInput: {
        value: '',
        error: false,
        msg : ''
      },
      brandsDropDown: []
    });

    wrapper.instance().handleInputFilter(event);
    expect(wrapper.state().brandInput).toMatchObject({
      value: '100',
      error: false,
      msg : ''
    });
    expect(wrapper.state().brandsDropDown).toEqual([ { brandNumber: 1001, brandName: 'Makita' } ]);
  });

  it('it should set state suppliersDropDown on handleInputFilter', () => {
    const event = { target: { id: 'supplier', value: '100' } };
    
    wrapper.setState({
      suppliers:[{
        supplierNumber: 1001,
        supplierName: 'Makita'
      }],
      suppplierInput: {
        value: '',
        error: false,
        msg : ''
      },
      suppliersDropDown: []
    });

    wrapper.instance().handleInputFilter(event);
    expect(wrapper.state().brandInput).toMatchObject({
      value: '100',
      error: false,
      msg : ''
    });
    expect(wrapper.state().suppliersDropDown).toEqual([ { supplierNumber: 1001, supplierName: 'Makita' } ]);
  });

  it('it should set state brandInput and empty brandsDropDown on handleselectedRow', () => {
    wrapper.setState({
      brandInput: {
        value: '',
        error: false,
        msg : ''
      },
      brandsDropDown: [{
        brandNumber: 1001,
        brandName: 'Makita'
      }]
    });
    wrapper.instance().handleSelectedRow({
      brandNumber: 1001,
      brandName: 'Makita'
    });
    expect(wrapper.state().brandInput).toMatchObject({
      value: '1001 - Makita',
      error: false, 
      msg: ''
    });
    expect(wrapper.state().brandsDropDown).toEqual([]);
  });

  it('it should set state supplierInput and empty suppliersDropDown on handleselectedRow', () => {
    wrapper.setState({
      supplierInput: {
        value: '',
        error: false,
        msg : ''
      },
      suppliersDropDown: [{
        supplierNumber: 1001,
        supplierName: 'Makita'
      }]
    });
    wrapper.instance().handleSelectedRow({
      supplierNumber: 1001,
      supplierName: 'Makita'
    });
    expect(wrapper.state().supplierInput).toMatchObject({
      value: '1001 - Makita',
      error: false, 
      msg: ''
    });
    expect(wrapper.state().suppliersDropDown).toEqual([]);
  });

  it('should validate brandInput on handleSavePart', () => {
    wrapper.setState({
      brandInput: {
        value: '123 - Makita',
        error: false,
        msg : ''
      }
    });
    wrapper.instance().handleSavePart();
    expect(wrapper.state().brandInput).toMatchObject({
      value: '123 - Makita',
      error: true,
      msg : 'Please select valid Brand.'
    });
  });

  it('should validate supplierInput on handleSavePart', () => {
    wrapper.setState({
      brands: [{
        brandNumber: 1001,
        brandName: 'Makita'
      }],
      brandInput: {
        value: '1001 - Makita',
        error: false,
        msg : ''
      },
      supplierInput: {
        value: '123 - Makita',
        error: false,
        msg : ''
      }
    });
    wrapper.instance().handleSavePart();
    expect(wrapper.state().supplierInput).toMatchObject({
      value: '123 - Makita',
      error: true,
      msg : 'Please select valid Supplier.'
    });
  });

  it('should validate cost on handleSavePart', () => {
    wrapper.setState({
      brands: [{
        brandNumber: 1001,
        brandName: 'Makita'
      }],
      suppliers: [{
        supplierNumber: 1001,
        supplierName: 'Makita'
      }],
      brandInput: {
        value: '1001 - Makita',
        error: false,
        msg : ''
      },
      supplierInput: {
        value: '1001 - Makita',
        error: false,
        msg : ''
      },
      cost: {
        value: '',
        error: false,
        msg : ''
      }
    });
    wrapper.instance().handleSavePart();
    expect(wrapper.state().cost).toMatchObject({
      value: '',
      error: true,
      msg : 'Please enter a valid Cost.'
    });
  });

  it('should validate part number on handleSavePart', () => {
    wrapper.setState({
      brands: [{
        brandNumber: 1001,
        brandName: 'Makita'
      }],
      suppliers: [{
        supplierNumber: 1001,
        supplierName: 'Makita'
      }],
      brandInput: {
        value: '1001 - Makita',
        error: false,
        msg : ''
      },
      supplierInput: {
        value: '1001 - Makita',
        error: false,
        msg : ''
      },
      cost: {
        value: '12',
        error: false,
        msg : ''
      },
      partNumberInput: {
        value: '',
        error: false,
        msg : ''
      }
    });
    wrapper.instance().handleSavePart();
    expect(wrapper.state().partNumberInput).toMatchObject({
      value: '',
      error: true,
      msg : 'Please enter a valid Part Number.'
    });
  });

  it('should validate description on handleSavePart', () => {
    wrapper.setState({
      brands: [{
        brandNumber: 1001,
        brandName: 'Makita'
      }],
      suppliers: [{
        supplierNumber: 1001,
        supplierName: 'Makita'
      }],
      brandInput: {
        value: '1001 - Makita',
        error: false,
        msg : ''
      },
      supplierInput: {
        value: '1001 - Makita',
        error: false,
        msg : ''
      },
      cost: {
        value: '12',
        error: false,
        msg : ''
      },
      partNumberInput: {
        value: '123',
        error: false,
        msg : ''
      },
      descriptionInput: {
        value: '',
        error: false,
        msg : ''
      }
    });
    wrapper.instance().handleSavePart();
    expect(wrapper.state().descriptionInput).toMatchObject({
      value: '',
      error: true,
      msg : 'Please enter a valid Description.'
    });
  });

  it('should set part info on handleSavePart', () => {
    wrapper.setState({
      userId: 'Admin',
      showAddPartModal: true,
      partNumberInput: {
        value: '123',
        error: false,
        msg: ''
      },
      descriptionInput: {
        value: 'BLADE GAUGE, N1900B',
        error: false,
        msg: ''
      },
      brandInput: {
        value: '123 - Makita',
        error: false,
        msg: ''
      },
      supplierInput: {
        value: '123 - Makita',
        error: false,
        msg: ''
      },
      cost: {
        value: '12',
        error: false,
        msg: ''
      },
      selectedPart: {},parts: [],
      brands: [{
        brandNumber: 123,
        brandName: 'Makita'
      }],
      suppliers: [{
        supplierNumber: 123,
        supplierName: 'Makita'
      }]
    });
    wrapper.instance().handleSavePart();
    expect(wrapper.state().selectedPart).toMatchObject({
      brandName: 'Makita',
      brandNbr: 123,
      cost: '12.00',
      partDesc: 'BLADE GAUGE, N1900B',
      partNbr: '123',
      supplierName: 'Makita',
      supplierNbr: 123,
      userId: 'Admin'
    });
  });

  describe('handleCreatePart', () => {
    it('should call API on handleCreatePart with a success status', async () => {
      wrapper.setState({ ...state, showSuccessModal: false });
      const query = { brandNbr: '123', cost: '12', partDesc: 'testdesc', partNbr: '123', supplierNbr: '23', userId: 'userID' };
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, 'handleResetSearch');
      const endPoint = nock(props.partsServiceUrl)
        .post('/parts/supplier')
        .query(query)
        .reply(200, { status: 200, statusText: 'OK' });
    
      await instance.handleCreatePart(query);
      expect(spy).toHaveBeenCalled();
      expect(endPoint.isDone()).toBe(true);
    });
  
    it('should call API on handleCreatePart with a failure status', async () => {
      nock(props.partsServiceUrl)
        .post('/parts/supplier')
        .query(true)
        .reply(500, function() {
          return { status: 500 };
        });
      const params = `?brandNbr=123&cost=12&partDesc=testdesc&partNbr=123&supplierNbr=23&userId=userID`;
      const url = `https://partsservice-dev.apps-np.homedepot.com/parts/supplier${params}`;
      const instance = wrapper.instance();
      await instance.handleCreatePart(() => {
        expect(wrapper.state('showFailureModal')).toBe(true);
      });
      
    });
  });

  describe('handlePartUpdate', () => {
    it('should call API on handlePartUpdate with a success status', async () => {
      wrapper.setState({
        selectedPart: {
          brandNbr: '123', 
          partNbr: '123', 
          supplierNbr: '23'
        },
        cost: '12', 
        userId: 'userID'
      });
      const endPoint = nock(props.partsServiceUrl)
        .put('/parts/supplier')
        .query(true)
        .reply(200, { status: 200, statusText: 'OK' });
      const instance = wrapper.instance();
      await instance.handlePartUpdate();
      expect(endPoint.isDone()).toBe(true);
    });

    it('should call API on handlePartUpdate with a success status', async () => {
      wrapper.setState({
        selectedPart: {
          brandNbr: '123', 
          partNbr: '123', 
          supplierNbr: '23'
        },
        cost: '12', 
        userId: 'userID'
      });
      const endPoint = nock(props.partsServiceUrl)
        .put('/parts/supplier')
        .query(true)
        .reply(500);
      const instance = wrapper.instance();
      await instance.handlePartUpdate();
      expect(endPoint.isDone()).toBe(true);
    });
  });

  describe('handleAllBrands', () => {
    let brandsWrapper;
    beforeAll(() => {
      brandsWrapper = shallow(<RepairPartsAdmin {...props} />);
    });

    it('should get all brands and setState with 200 response', async () => {
      brandsWrapper.setState({ brands: [] });
      const endPoint = nock(props.partsServiceUrl)
        .get('/brands')
        .reply(200, [{
          brandNumber: 123,
          brandName: 'Makita'
        }] );
      await brandsWrapper.instance().handleAllBrands();
      expect(endPoint.isDone()).toBe(true);
    });
  });

  describe('handleAllSuppliers',  () => {
    let suppliersWrapper;
    beforeAll(() => {
      suppliersWrapper = shallow(<RepairPartsAdmin {...props} />);
    });

    it('should get all suppliers and setState with 200 response', async () => {
      suppliersWrapper.setState({ suppliers: [] });
      const endPoint = nock(props.partsServiceUrl)
        .get('/suppliers')
        .reply(200, [{
          supplierNumber: 123,
          supplierName: 'Makita'
        }] );
      await suppliersWrapper.instance().handleAllSuppliers();
      expect(endPoint.isDone()).toBe(true);
    });
    
  });

});
