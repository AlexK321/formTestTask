import React from 'react';
import { shallow } from 'enzyme';
import SubmitResult from './SubmitResult';

describe('Component: SubmitResult', () => {
  const setUp = (props?: any) => shallow(<SubmitResult {...props} />);
  let component: any;

  beforeEach(() => {
    component = setUp();
  });

  describe('when render elements', () => {
    it('check existence component', () => {
      expect(component).toBeTruthy();
    });

    it('should contain .result-block', () => {
      const wrapper = component.find('.result-block');

      expect(wrapper).toHaveLength(1);
    });

    it('snapshot component', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('when there are props', () => {
    it('should render negative response', () => {
      const responseMessage = 'Данные формы не отправлены';
      const hasError = true;

      component = shallow(<SubmitResult hasError={hasError} />);
      const description = component.find('h2');

      expect(description.text()).toBe(responseMessage);
    });

    it('should render positive response', () => {
      const responseMessage = 'Данные формы отправлены успешно';
      const hasError = false;

      component = shallow(<SubmitResult hasError={hasError} />);
      const description = component.find('h2');

      expect(description.text()).toBe(responseMessage);
    });
  });
});
