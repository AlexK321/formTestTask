import React from 'react';
import { mount } from 'enzyme';
import FormItem from './FormItem';

describe('Component: FormItem', () => {
  it('should existence input', () => {
    const placeholder = 'Enter you name';
    const component = mount(<FormItem name="userName" placeholder={placeholder} />);
    const input = component.find('input');

    expect(input).toHaveLength(1);
  });
});
