import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ErrorBlock from './ErrorBlock';

interface ParamTypes {
  error: string;
}

describe('Component: ErrorBlock', () => {
  const setUp = (props?: ParamTypes) => shallow(<ErrorBlock {...props} />);
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
