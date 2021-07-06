import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SubmitResult from './SubmitResult';

interface ParamTypes {
  hasError: boolean;
}

describe('Component: SubmitResult', () => {
  const setUp = (props?: ParamTypes) => shallow(<SubmitResult {...props} />);
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp();
  });

  it('should contain .result-block', () => {
    const wrapper = component.find('.result-block');

    expect(wrapper).not.toBeNull();
  });

  it('match snapshot component', () => {
    expect(component).toMatchSnapshot();
  });

  it.each([
    { responseMessage: 'Данные формы не отправлены', hasError: true },
    { responseMessage: 'Данные формы отправлены успешно', hasError: false },
  ])('should render negative response', ({ responseMessage, hasError }) => {
    component = shallow(<SubmitResult hasError={hasError} />);
    const description = component.find('h2');

    expect(description.text()).toBe(responseMessage);
  });
});
