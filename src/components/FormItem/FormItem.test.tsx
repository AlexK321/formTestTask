import React from 'react';
import { shallow } from 'enzyme';
import FormItem from './FormItem';

describe('Component: FormItem', () => {
  const component = shallow(<FormItem />);

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
