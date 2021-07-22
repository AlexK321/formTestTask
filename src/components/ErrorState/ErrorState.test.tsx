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
    const errorProps = { error: 'error test' };

    component = setUp(errorProps);
  });

  it('match snapshot component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render error text', () => {
    const errorBlock = component.find('p');

    expect(errorBlock.text()).toBe('error test');
  });
});
