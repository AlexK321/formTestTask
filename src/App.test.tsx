import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
//import Context from './Context';

describe('Component: App', () => {
  const component = shallow(<App />);

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});

// describe('Test of <Greeting />', () => {
//   it('>>>> should show greeting with another name', async () => {
//     const wrapper = mount(
//       <Context.Provider value={jest.fn(() => 'testError')}>
//         <p> test </p>
//       </Context.Provider>
//     );

//     expect(wrapper.find('h1').text()).toEqual('Hello Alice Middleman');
//   });
// });
