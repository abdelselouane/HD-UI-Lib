import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ListItem from './ListItem';
import toJson from 'enzyme-to-json';
import * as Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe('<ListItem />', () => {
    let wrapper;
    let props;
    let parts;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        ReactDOM.createPortal = jest.fn();

        parts = {
            partNbr: 'mockPartNumber1',
            partDescription: 'mockDescription1',
            brandName: 'mockBrandName1',
            supplierName: 'mockSupplierName1',
            cost: 10
        };

        props = {
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
                onClick: jest.fn()
            }]
        };
        wrapper = shallow(<ListItem {...props} data={parts} />);
    });

    it('should render properly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should call handleEditPart on Edit Part Button', () => {
        const spy = jest.spyOn(props.actions[0], 'onClick');
        const listButton = wrapper.find('.button');
        listButton.simulate('click');
        expect(spy).toHaveBeenCalled();
    });

});