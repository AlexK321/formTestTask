import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Form, { getInitialValues } from './Form';
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
    xit('should match snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('when request status exists', () => {
    const status = 200;

    beforeEach(() => {
      (axios.post as jest.Mock).mockResolvedValue({ status });
    });

    describe('when form is finished', () => {
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

const initialValue = {
  userName: 'qwe',
  phoneNumber: 'qwer',
  email: 'qwert',
};

describe('when request status is null', () => {
  it('should match snapshot', () => {
    expect(getInitialValues(initialValue)).toEqual({
      email: 'qwert',
      phoneNumber: 'qwer',
      userName: 'qwe',
    });
  });
});
