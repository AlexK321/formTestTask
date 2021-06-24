import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

/* eslint-disable */


it('renders learn react link', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.text()).toContain('Заявка');
});

/* eslint-enable */
