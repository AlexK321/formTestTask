import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SubmitResult from './SubmitResult';

describe('Component: SubmitResult', () => {
  const setUp = () => shallow(<SubmitResult />);
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
});
