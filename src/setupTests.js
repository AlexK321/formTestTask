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

Object.fromEntries = (l) => l.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    writable: true,
  },
});

Enzyme.configure({ adapter: new Adapter() });
