import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import InputFieldAdmin from './InputFieldAdmin';
import toJson from 'enzyme-to-json';
import * as Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe('<InputFieldAdmin />', () => {
  let wrapper;
  let props;
  let item;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    ReactDOM.createPortal = jest.fn();
    props = {
      field: {
        type: "number",
        id: "cost",
        name: "cost",
        pattern: "^\d*(\.\d{0,2})?$",
        value: '',
        required: "required",
        placeholder: "Enter cost here",
        onChange: jest.fn()
      },
      label: {
        text: "Cost"
      },
      fieldError: {
        flag: false,
        msg: ''
      },
      dropDownData: [{ brandNumber: 123, brandName: "brandName" }],
      toDisplay: ['property1', 'property2'],
      zIndex: true,
      handleSelectedItem: jest.fn()
    };
    

    // item = { brandNumber: 123, brandName: "brandName" };
    
    wrapper = shallow(<InputFieldAdmin {...props} />);
 
  
  });

  it('should render properly', () => {
    wrapper.setProps({ fieldError: { ...props.error, flag: true } });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call handleSelectedItem on row selection', () => {
    const spy = jest.spyOn(props, 'handleSelectedItem');
    const row = wrapper.find('.standard-table tbody>tr');
    row.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

});