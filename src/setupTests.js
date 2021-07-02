import '@testing-library/jest-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => false,
    removeListener: () => false,
  }),
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => false,
  }),
});
/* eslint-disable no-proto*/
jest.spyOn(window.localStorage.__proto__, 'setItem');
window.localStorage.__proto__.setItem = jest.fn();

const localStorageMock = () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock(),
});

Enzyme.configure({ adapter: new Adapter() });
