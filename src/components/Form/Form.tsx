import React, { ReactElement, useState } from 'react';
import { Form as FormComponent, Button } from 'antd';
import './Form.css';
import axios from 'axios';
import SubmitResult from '../SubmitResult/SubmitResult';
import FormItem from '../FormItem/FormItem';

interface FormData {
  email?: string;
  phoneNumber?: string;
  userName?: string;
}

const userName = 'userName';
const phoneNumber = 'phoneNumber';
const email = 'email';
const labelCol = { span: 8 };
const wrapperCol = { span: 16 };

const initialValue = {
  userName: localStorage.getItem(userName) || '',
  phoneNumber: localStorage.getItem(phoneNumber) || '',
  email: localStorage.getItem(email) || '',
};

const changeInitialValue = (initialValue1: FormData, filled1: string | null) => {
  const initialValueArr = Object.entries(initialValue1);
  for (let i = Number(filled1); i < initialValueArr.length; i += 1) {
    initialValueArr[i][1] = '';
  }
  return Object.fromEntries(initialValueArr);
};

const getInitialValuesForm = () => {
  const url = new URL(window.location.href);
  const filled = url.searchParams.get('filled');
  if (filled === '0') {
    url.searchParams.delete('filled');
    document.location.href = url.toString();
  } else if (Number(filled) > 0) {
    return changeInitialValue(initialValue, filled);
  }
  return initialValue;
};

const Form = (): ReactElement => {
  const [requestStatus, setRequestStatus] = useState<number | null>(null);

  const sendFormData = async (formData: FormData) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      setRequestStatus(response.status);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (formData: FormData): void => {
    const formDataArray = Object.entries(formData);
    localStorage.setItem(String(formDataArray[0][0]), String(formDataArray[0][1]));
  };

  if (requestStatus) return <SubmitResult status={requestStatus} />;

  return (
    <FormComponent
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      initialValues={getInitialValuesForm()}
      onFinish={sendFormData}
      onValuesChange={handleChange}
    >
      <h2>Контакты</h2>
      <FormItem name="userName" placeholder="Ваше имя" />
      <div className="form-row">
        <FormItem name="phoneNumber" placeholder="Телефон" />
        <FormItem name="email" placeholder="E-mail" />
      </div>
      <div className="form-row">
        <Button type="primary" htmlType="submit">
          Отправить заявку
        </Button>
        <p>
          Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных
        </p>
      </div>
    </FormComponent>
  );
};

export default Form;
