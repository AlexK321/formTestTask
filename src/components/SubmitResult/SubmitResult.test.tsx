import React from 'react';
import { shallow } from 'enzyme';
import SubmitResult from './SubmitResult';
/*eslint-disable */
describe('test SubmitResult component', () => {
  const setUp = (props?: any) => shallow(<SubmitResult {...props} />)
  let component: any = null;
  beforeEach(() => {
    component = setUp();
  })

  it('check existence component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain .result-block', () => {
    const wrapper = component.find('.result-block')
    expect(wrapper.length).toBe(1);
  });

  it('snapshot component', () => {
    expect(component).toMatchSnapshot();
  });
})

describe('test props', () => {
  it('should render negative response', () => {
    const response = true
    const responseMessage = 'Данные формы не отправлены'
    const component = shallow(<SubmitResult hasError={response} />)
    const description = component.find('h2');
    expect(description.text()).toBe(responseMessage);
  });

  it('should render positive response', () => {
    const response = false
    const responseMessage = 'Данные формы отправлены успешно'
    const component = shallow(<SubmitResult hasError={response} />)
    const description = component.find('h2');
    expect(description.text()).toBe(responseMessage);
  });
});
