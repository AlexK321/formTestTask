import React, { FC, useState } from 'react';
import { Form as FormComponent, Button } from 'antd';
import axios from 'axios';
import { USER_NAME, PHONE_NUMBER, EMAIL, labelCol, wrapperCol } from './constants';
import './Form.css';
import SubmitResult from '../SubmitResult/SubmitResult';
import FormItem from '../FormItem/FormItem';

interface FormData {
  email?: string;
  phoneNumber?: string;
  userName?: string;
}

const initialValue = {
  userName: localStorage.getItem(USER_NAME) || '',
  phoneNumber: localStorage.getItem(PHONE_NUMBER) || '',
  email: localStorage.getItem(EMAIL) || '',
};

export const changeInitialValue = (formData: FormData, filled: number): FormData => {
  const filteredFormData = Object.entries(formData).slice(0, filled);

  return Object.fromEntries(filteredFormData);
};

export const getInitialValues = (formData: FormData): FormData => {
  const url = new URL(window.location.href);
  const filled = Number(url.searchParams.get('filled'));
  const maxItems = Object.entries(formData).length;

  if (filled && (filled === 0 || filled > maxItems)) {
    url.searchParams.delete('filled');
    document.location.href = url.toString();
  } else if (filled > 0) {
    return changeInitialValue(formData, filled);
  }

  return formData;
};

const Form: FC = () => {
  const [hasError, setError] = useState<boolean | null>(null);

  const sendFormData = async (formData: FormData) => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  const handleChange = (formData: FormData): void => {
    const formDataEntries = Object.entries(formData);
    const [key, value] = formDataEntries[0];

    localStorage.setItem(key, value);
  };

  if (hasError !== null) {
    return <SubmitResult hasError={hasError} />;
  }

  return (
    <FormComponent
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      initialValues={getInitialValues(initialValue)}
      onFinish={sendFormData}
      onValuesChange={handleChange}
    >
      <h2>Контакты</h2>
      <FormItem name={USER_NAME} placeholder="Ваше имя" />
      <div className="form-row">
        <FormItem name={PHONE_NUMBER} placeholder="Телефон" />
        <FormItem name={EMAIL} placeholder="E-mail" />
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
