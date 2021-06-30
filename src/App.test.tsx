import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

// call sequence jest: describle -> it ? it -> describe -> beforeEach or beforeAll ?
// jest.mock ? jest.spyOn vs jest.mock +-+-+-
// js naming convention +
// jest eslint fix ++++
// refactoring tests +-+-+-
// clean code ----

describe('Component: App', () => {
  const component = shallow(<App />);

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
