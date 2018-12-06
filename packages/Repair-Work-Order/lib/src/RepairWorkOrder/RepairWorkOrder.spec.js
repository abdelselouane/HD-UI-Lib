import React from 'react';
import RepairWorkOrder from './RepairWorkOrder';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe('<RepairWorkOrder />', () => {
    let wrapper;
    let state;
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    beforeAll(() => {
      state = {
        selectedItem: {
            id: 1,
            value: 'Item1',
            option: 'Item1'
        },
        dropdownOpen: false
      };
      wrapper = shallow(<RepairWorkOrder />);
    });
  
    it('should render properly', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should set selectedItem when handleSelectedItem is called', () =>{
        wrapper.setState({ dropdownOpen: true });
        const event = { target: { id: 'Item2', value: '2', title: 'Item2' }}
        wrapper.instance().handleSelectedItem(event);
        expect(wrapper.state().selectedItem).toMatchObject({ id: 2, value: 'Item2', option: 'Item2' });
        expect(wrapper.state().dropdownOpen).toBe(false);
    });

    it('should set dropdownOpen to true when handleDropdownOpen is called', () => {
        wrapper.instance().handleDropdownOpen();
        expect(wrapper.state().dropdownOpen).toBe(true);
    });
  });
  

