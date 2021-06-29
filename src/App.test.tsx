import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { changeInitialValue } from './components/Form/Form';
import FormItem from './components/FormItem/FormItem';

jest.mock('axios');

// call sequence jest: describle -> it ? it -> describe -> beforeEach or beforeAll ?
// jest.mock ? jest.spyOn vs jest.mock
// js naming convention +++
// jest eslint fix
// refactoring tests
// clean code +-+-+-

describe('Component: App', () => {
  const component = shallow(<App />);

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});

// it('should render placeholder', () => {
//   const placeholder = 'Enter you name'
//   const component = mount(<FormItem name='userName' placeholder={placeholder} />)
//   const input = component.find('input');
//   expect(input.name).toContain(placeholder);
// });

it('check existence element', () => {
  const placeholder = 'Enter you name';
  const component = mount(<FormItem name="userName" placeholder={placeholder} />);
  const input = component.find('input');

  expect(input).toHaveLength(1);
});

// it('instanse', () => {
//   const component = mount(<Form />)
//   const instanse = component.instance()
//   console.log(instanse.state)
//   console.log(instanse)
// });
// describe('click test', () => {
//   // it('test click', () => {
//   //   const component = mount(<Form />)
//   //   const button = component.find('button');
//   //   button.simulate('click');
//   //   expect(component.text).toContain('.result-block');
//   // });

//   // it('change test', () => {
//   //   const component = mount(<FormItem name='userName' placeholder='placeholder' />)
//   //   const input = component.find('input');
//   //   input.simulate('change');
//   //   expect(component.text).toContain('.result-block');
//   // });
// })

const sum = (a: any, b: any) => {
  return a + b;
}

describe('function test', () => {
  const arr1 = [1, 2, 3, 4, 6, 8, 9];
  const arr2 = [2, 3, 4, 6, 8, 9, 10];
  const arr3 = [3, 5, 7, 10, 14, 17, 19];

  it('test click', () => {
    arr1.forEach((item, index) => {
      expect(sum(item, arr2[index])).toBe(arr3[index]);
    });
  });
});

const initialValue = {
  userName: 'userName',
  phoneNumber: 'phoneNumber',
  email: 'email',
};

const returnValueOneTest = {
  userName: 'userName',
  phoneNumber: '',
  email: '',
};

describe('qe qe qe', () => {
  xit('changeInitialValue test ', () => {
    expect(changeInitialValue(initialValue, 1)).toEqual(returnValueOneTest);
  });
});
