import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import SubmitBlock from './SubmitBlock';

describe('Component: SubmitBlock', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<SubmitBlock SMSResendTimer={20} />);
  });

  it('match snapshot component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render title', () => {
    const consentDataProcessing =
      'Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных';
    const wrapper = component.find('.form-description');

    expect(wrapper.text()).toBe(consentDataProcessing);
  });
});
