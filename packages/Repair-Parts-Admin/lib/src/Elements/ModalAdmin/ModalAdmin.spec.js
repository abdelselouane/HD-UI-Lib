import React from 'react';
import { shallow } from 'enzyme';
import ModalAdmin, { Modal } from './ModalAdmin';
import toJson from 'enzyme-to-json';
import * as Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe('<ModalAdmin />', () => {
    let wrapper;
    let props;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
      // ReactDOM.createPortal = jest.fn();
        props = {
          modal: {
            id: "modalID",
            type: ""
          },
          toolBar: {
            title: `Edit cost of part #123`,
            onClick: jest.fn(),
            ref: jest.fn()
          },
          content: 'content',
          actions: [{
            id: 'close',
            onClick: jest.fn(),
            className: "button",
            text: "Cancel"
          },
          {
            id: 'save',
            onClick: jest.fn(),
            className: `button primary`,
            text: "Save Item"
          }],
          styles: {
            width: "500px",
            height: "280px"
          }
        };
        wrapper = shallow(<ModalAdmin {...props} show={true} />);
    });
  
    it('should render properly', () => {
      wrapper = shallow(<ModalAdmin {...props} />);
      wrapper.setProps({ show: false });
      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.setProps({ show: true });
      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.setProps({ modal: { ...props.modal, type: 'success' } });
      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.setProps({ modal: { ...props.modal, type: 'failure' } });
      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.setProps({ styles: { ...props.styles, top: '0%' } });
      expect(toJson(wrapper)).toMatchSnapshot();
      const newActions = props.actions;
      newActions[0] = {
        ...newActions[0],
        disabled: true
      };
      wrapper.setProps({ actions: newActions });
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(toJson(shallow(<Modal modalType={"success"} />))).toMatchSnapshot();
    });

});