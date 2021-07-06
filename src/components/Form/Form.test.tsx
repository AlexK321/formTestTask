import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import axios from 'axios';
import Form from './Form';
import SubmitResult from '../SubmitResult/SubmitResult';

jest.mock('axios');

describe('Component: Form', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<Form />);
  });

  describe('when request status exists', () => {
    const status = 200;

    beforeEach(() => {
      (axios.post as jest.Mock).mockResolvedValue({ status });
    });

    describe('when form is finished with result ', () => {
      beforeEach(() => {
        component.simulate('finish');
      });

      it('should render SubmitResult', () => {
        const submitResult = component.find(SubmitResult);

        expect(submitResult).toHaveLength(1);
        expect(submitResult.props()).toStrictEqual({ hasError: false });
      });
    });
  });

  describe('when reject status exists', () => {
    const status = 404;

    beforeEach(() => {
      (axios.post as jest.Mock).mockRejectedValue({ status });
      component.update();
    });

    describe('when form is finished with result ', () => {
      beforeEach(() => {
        component.simulate('finish');
      });

      it('should render SubmitResult', () => {
        const submitResult = component.find(SubmitResult);

        expect(submitResult).toHaveLength(1);
        expect(submitResult.props()).toStrictEqual({ hasError: true });
      });
    });
  });

  it('should render title', () => {
    const consentDataProcessing =
      'Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных';
    const wrapper = component.find('.form-description');

    expect(wrapper.text()).toBe(consentDataProcessing);
  });

  it('should render button', () => {
    const wrapper = component.find('Button');

    expect(wrapper).not.toBeNull();
  });

  describe('when change input', () => {
    beforeEach(() => {
      component.simulate('valuesChange', {
        email: 'e',
      });
    });

    it('should change localStorage', () => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });
});
