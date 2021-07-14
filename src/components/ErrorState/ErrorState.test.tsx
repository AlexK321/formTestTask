import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ErrorState from './ErrorState';

interface ParamTypes {
  error: string;
}

describe('Component: ErrorState', () => {
  const setUp = (props?: ParamTypes) => shallow(<ErrorState {...props} />);
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp();
  });

  it('match snapshot component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render error text', () => {
    const errorText = 'error test text';

    component = shallow(<ErrorState error={errorText} />);
    const errorBlock = component.find('p');

    expect(errorBlock.text()).toBe(errorText);
  });
});
