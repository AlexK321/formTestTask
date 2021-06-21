import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Form as FormComponent, Button } from 'antd';
import 'antd/dist/antd.css';
import './Form.css';
import axios from 'axios';
import SubmitResult from '../SubmitResult/SubmitResult';
import FormItem from '../FormItem/FormItem';

interface FormDataType {
  email?: string;
  phoneNumber?: string;
  userName?: string;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
//const axios = require('axios').default;

const formItemsNames: Array<string> = ['userName', 'phoneNumber', 'email'];
const labelCol = { span: 8 };
const wrapperCol = { span: 16 };

const initialValues: FormDataType = {
  userName: localStorage.getItem(formItemsNames[2]) || '',
  phoneNumber: localStorage.getItem(formItemsNames[1]) || '',
  email: localStorage.getItem(formItemsNames[0]) || '',
};

const rules = [
  { required: true, message: 'Поле не должно быть пустым' },
  {
    max: 10,
    message: `Максимальная длинна строки - 10 символов`,
  },
];

const Form = (): ReactElement => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const filled = url.searchParams.get('filled');
    if (filled === '0') {
      url.searchParams.delete('filled');
      document.location.href = url.toString();
    } else {
      console.log(Object.keys(initialValues));
    }
    switch (filled) {
      case '1':
        initialValues.phoneNumber = '';
        initialValues.email = '';
        break;
      case '2':
        initialValues.email = '';
        break;
      default:
        break;
    }
  }, []);

  const [requestStatus, setRequestStatus] = useState<number | null>(null);

  const createRequest = async (formData: FormDataType) => {
    try {
      const resp = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      setRequestStatus(resp.status);
    } catch (err) {
      console.error(err);
    }
  };

  const onFinish = (formData: FormDataType) => {
    createRequest(formData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    localStorage.setItem(event.target.name, event.target.value);
  };

  if (requestStatus) return <SubmitResult status={requestStatus} />;

  return (
    <FormComponent
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <h2>Контакты</h2>
      <FormItem name="userName" placeholder="Ваше имя" handleChange={handleChange} rules={rules} />
      <FormItem
        name="phoneNumber"
        placeholder="Телефон"
        handleChange={handleChange}
        rules={rules}
      />
      <FormItem name="email" placeholder="E-mail" handleChange={handleChange} rules={rules} />
      <Button type="primary" htmlType="submit">
        Отправить заявку
      </Button>
      <p>Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных</p>
    </FormComponent>
  );
};

export default Form;
