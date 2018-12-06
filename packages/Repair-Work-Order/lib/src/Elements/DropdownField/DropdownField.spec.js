import React from 'react';
import { shallow, mount } from 'enzyme';
import DropdownField from './DropdownField';
import toJson from 'enzyme-to-json';
import * as Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });


describe('<DropdownField />', () => {
    let wrapper;
    let props;

    beforeAll( () => {

        props = {
            id: 'dropDown',//Required
            label: '', //Optional
            dropdownOpen: false,
            selectedItem: {
                id: 1,
                value: 'Item1',
                option: 'Item1'
            },
            //Required Object[Item]: Should be set in the state
            handleSelectedItem: jest.fn(),
            //Required Func: Should be set in parent component
            handleDropdownOpen: jest.fn().mockImplementation( () => {
                props.dropdownOpen = true
            }),
            //Required Func: Should be set in parent component
            items: [{//Required
                id: 0,
                value: '',
                option: 'Work Order'
            },
            {
                id: 1,
                value: 'Item1',
                option: 'Item1'
            },
            {
                id: 2,
                value: 'Item2',
                option: 'Item2'
            },
            {
                id: 3,
                value: 'Item3',
                option: 'Item3'
            }]
        }
        wrapper = mount(<DropdownField  { ...props } />);
    });
    
    it('should render properly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // it('should open dropdown when dropdownOpen is truthful', () => {
    //     const dropdown = wrapper.find('div.dropdown-list');
    //     expect(dropdown).toHaveLength(1);

    //     const dropdownLabel = wrapper.find('div.dropdown-label');
    //     const spy = jest.spyOn(props, 'handleDropdownOpen');
    //     dropdownLabel.simulate('click');

    //     expect(spy).toHaveBeenCalled();
    //     expect(props.dropdownOpen).toBe(true);

    //     wrapper = mount(<DropdownField  { ...props } />);
    //     const dropdownOpened = wrapper.find('div.dropdown-opened');
    //     expect(dropdownOpened).toHaveLength(1);
    // })

});

