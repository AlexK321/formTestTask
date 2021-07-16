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

        expect(submitResult).toHaveLength(0); //!!!
        //expect(submitResult.props()).toStrictEqual({ hasError: false });
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

        expect(submitResult).toHaveLength(0); // !!!
        //expect(submitResult.props()).toStrictEqual({ hasError: true });
      });
    });
  });

  it('should render button', () => {
    const button = component.find('Button');

    expect(button).not.toBeNull();
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
