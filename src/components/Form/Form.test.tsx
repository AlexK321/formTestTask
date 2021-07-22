import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Form from './Form';
import SMSBlock from '../SMSBlock/SMSBlock';

jest.mock('axios');

describe('Component: Form', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<Form />);
  });

  describe('when submit form (press submit button)', () => {
    beforeEach(() => {
      component.simulate('finish');
    });

    it('should render SMSBlock', () => {
      expect(component.find(SMSBlock)).toHaveLength(1);
    });
  });

  describe('when change input', () => {
    beforeEach(() => {
      component.simulate('valuesChange', {
        email: 'test email',
      });
    });

    it('should change localStorage', () => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });
});
