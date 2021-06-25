import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Form from './components/Form/Form';
import SubmitResult from './components/SubmitResult/SubmitResult';
import FormItem from './components/FormItem/FormItem';

/* eslint-disable */

describe('test App component', () => {
  const setUp = (props: any) => shallow(<App {...props} />)
  let component: any = null;
  beforeEach(() => {
    component = setUp();
  })

  it('should contain title', () => {
    expect(component.text()).toContain('Заявка');
  });

  it('should contain Form', () => {
    const wrapper = component.find('Form')
    expect(wrapper.length).toBe(1);
  });

  it('snapshot component', () => {
    expect(component).toMatchSnapshot();
  });
})

describe('test Form component', () => {
  const setUp = (props: any) => shallow(<Form {...props} />)
  let component: any = null;
  beforeEach(() => {
    component = setUp();
  })
  const consentDataProcessing = 'Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных'

  it('should contain title', () => {
    expect(component.text()).toContain(consentDataProcessing);
  });

  it('should contain button', () => {
    const wrapper = component.find('Button')
    expect(wrapper.length).toBe(1);
  });

  it('snapshot component', () => {
    expect(component).toMatchSnapshot();
  });
})

describe('test SubmitResult component', () => {
  const setUp = (props: any) => shallow(<SubmitResult {...props} />)
  let component: any = null;
  beforeEach(() => {
    component = setUp();
  })

  it('check existence component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain .result-block', () => {
    const wrapper = component.find('.result-block')
    expect(wrapper.length).toBe(1);
  });

  it('snapshot component', () => {
    expect(component).toMatchSnapshot();
  });
})

describe('test props', () => {
  it('should render negative response', () => {
    const response = 500
    const responseMessage = 'Данные формы не отправлены. Ошибка: 500'
    const component = shallow(<SubmitResult status={response} />)
    const description = component.find('h2');
    expect(description.text()).toBe(responseMessage);
  });

  it('should render positive response', () => {
    const response = 200
    const responseMessage = 'Данные формы отправлены успешно. Статус ответа: 200'
    const component = shallow(<SubmitResult status={response} />)
    const description = component.find('h2');
    expect(description.text()).toBe(responseMessage);
  });

  // it('should render placeholder', () => {
  //   const placeholder = 'Enter you name'
  //   const component = mount(<FormItem name='userName' placeholder={placeholder} />)
  //   const input = component.find('input');
  //   expect(input.name).toContain(placeholder);
  // });

  it('check existence element', () => {
    const placeholder = 'Enter you name'
    const component = mount(<FormItem name='userName' placeholder={placeholder} />)
    const input = component.find('input');
    expect(input).toHaveLength(1)
  });

  // it('instanse', () => {
  //   const component = mount(<Form />)
  //   const instanse = component.instance()
  //   console.log(instanse.state)
  //   console.log(instanse)


  // });
})

describe('click test', () => {
  // it('test click', () => {
  //   const component = mount(<Form />)
  //   const button = component.find('button');
  //   button.simulate('click');
  //   expect(component.text).toContain('.result-block');
  // });

  // it('change test', () => {
  //   const component = mount(<FormItem name='userName' placeholder='placeholder' />)
  //   const input = component.find('input');
  //   input.simulate('change');
  //   expect(component.text).toContain('.result-block');
  // });


})

const sum = (a: any, b: any) => {
  return a + b
}

describe('function test', () => {
  const arr1 = [1, 2, 3, 4, 6, 8, 9]
  const arr2 = [2, 3, 4, 6, 8, 9, 10]
  const arr3 = [3, 5, 7, 10, 14, 17, 19]
  it('test click', () => {
    arr1.forEach((item, index) => {
      expect(sum(item, arr2[index])).toBe(arr3[index]);
    })
  });
})
