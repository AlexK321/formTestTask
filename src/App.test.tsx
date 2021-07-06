import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('Component: App', () => {
  const component = shallow(<App />);

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
