import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Form, { changeInitialValue, getInitialValues } from './Form';
import SubmitResult from '../SubmitResult/SubmitResult';

jest.mock('axios');

describe('Component: Form', () => {
  const setUp = (props?: any) => shallow(<Form {...props} />);
  let component: any = null;

  beforeEach(() => {
    component = setUp();
  });

  const consentDataProcessing =
    'Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных';

  describe('when request status is null', () => {
    it('should match snapshot', () => {
      expect(component).toMatchSnapshot();
    });
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

  describe('when render elements', () => {
    it('should render title', () => {
      expect(component.text()).toContain(consentDataProcessing);
    });

    it('should render button', () => {
      const wrapper = component.find('Button');

      expect(wrapper).toHaveLength(1);
    });

    it('snapshot component', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('when change formData', () => {
    const initialValue = {
      userName: 'userName',
      phoneNumber: 'phoneNumber',
      email: 'email',
    };

    it('should change formData', () => {
      expect(changeInitialValue(initialValue, 1)).toEqual({
        email: '',
        phoneNumber: '',
        userName: 'userName',
      });
      expect(changeInitialValue(initialValue, 2)).toEqual({
        email: '',
        phoneNumber: 'phoneNumber',
        userName: 'userName',
      });
      expect(changeInitialValue(initialValue, 3)).toEqual({
        email: 'email',
        phoneNumber: 'phoneNumber',
        userName: 'userName',
      });
    });
  });

  //  27-37
  describe('when get filled from url and change formData', () => {
    it('should change localStorage', () => {
      const initialValue = {
        userName: 'userName',
        phoneNumber: 'phoneNumber',
        email: 'email',
      };

      expect(getInitialValues(initialValue)).toEqual(initialValue);
    });
  });

  //  54-59
  describe('when change input', () => {
    beforeEach(() => {
      component.simulate('valuesChange', {
        email: 'emailValue',
      });
    });

    it('should change localStorage', () => {
      expect(localStorage.getItem('email')).toBe('emailValue');
      // expect(localStorage.getItem.mock.calls.length).toBe(1)
    });
  });
});
