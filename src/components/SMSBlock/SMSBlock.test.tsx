import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import axios from 'axios';
import SMSBlock from './SMSBlock';
import { FormData } from '../../Types/interfaces';
import SubmitResult from '../SubmitResult/SubmitResult';
import { CORRECT_SMS_CODE } from '../Form/constants';

interface ParamTypes {
  setSMSBlock: (arg0: boolean) => void;
  formDataValues?: FormData;
}

jest.mock('axios');

describe('Component: SMSBlock', () => {
  const testProps: ParamTypes = {
    setSMSBlock: jest.fn(),
    formDataValues: {
      userName: 'test',
      phoneNumber: 'test',
      email: 'test',
    },
  };
  //@ts-ignore
  const setUp = (props?: ParamTypes) => shallow(<SMSBlock {...props} />);
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp(testProps);
  });

  afterEach(() => {
    component = setUp(testProps);
  });

  it('match snapshot component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call setSMSBlock', () => {
    const button = component.find('Button');

    button.simulate('click');
    expect(testProps.setSMSBlock).toHaveBeenCalledTimes(1);
  });

  describe('when the SMS code is correct', () => {
    beforeEach(() => {
      (axios.post as jest.Mock).mockResolvedValue({ data: { smsCode: CORRECT_SMS_CODE } });
    });

    describe('when form is finished with result ', () => {
      beforeEach(() => {
        const search = component.find('Search');

        search.simulate('search');
      });

      it('should render SubmitResult', () => {
        expect(component.find(SubmitResult)).toHaveLength(1);
      });
    });
  });

  describe('when the SMS code is incorrect', () => {
    beforeEach(() => {
      (axios.post as jest.Mock).mockResolvedValue({ data: { smsCode: '1112' } });
      const search = component.find('Search');

      search.simulate('search');
      search.simulate('search');
    });

    it('should render sms-warning', () => {
      const description = component.find('.sms-warning');

      expect(description.text()).toEqual('Неправильный код. Осталось 1 попытки.');
    });

    describe('when SMS submit = 3', () => {
      beforeEach(() => {
        const search = component.find('Search');

        search.simulate('search');
      });

      it('should unmount SMS block ', () => {
        expect(testProps.setSMSBlock).toHaveBeenCalledTimes(1);
        expect(component.text()).not.toContain('sms-warning');
      });
    });
  });

  describe('when server error', () => {
    beforeEach(() => {
      (axios.post as jest.Mock).mockRejectedValue('test error');
      const search = component.find('Search');

      search.simulate('search');
    });

    it('should render SubmitResult', () => {
      expect(component).toEqual({}); // как проверить демонтирование всей компоненты ?
    });
  });
});
