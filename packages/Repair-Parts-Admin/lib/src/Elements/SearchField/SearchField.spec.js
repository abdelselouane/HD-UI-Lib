import React from 'react';
import SearchField from './SearchField';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe('<SearchField />', () => {
  let wrapper;
  let props;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    props = {
      input: {
        id: 'searchField',
        type: 'text',
        placeholder: "placeholder",
        value: '123',
        onChange: jest.fn()
      },
      action: {
        id: 'searchLink',
        onClick: jest.fn(),
        text: "Search"
      }
    };
    wrapper = shallow(<SearchField {...props} />);
  });

  it('should render properly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call handleOnChange on Search Field Change', () => {
    const spy = jest.spyOn(props.input, 'onChange');
    const searchField = wrapper.find('#searchField');
    searchField.simulate('change');
    expect(spy).toHaveBeenCalled();
  });

  it('should call handleSearch on Search Link Click', () => {
    const spy = jest.spyOn(props.action, 'onClick');
    const searchLink = wrapper.find('#searchLink');
    searchLink.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

});
