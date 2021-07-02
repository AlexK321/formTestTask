import React, { FC, useState } from 'react';
import { Form as FormComponent, Button } from 'antd';
import axios from 'axios';
import { USER_NAME, PHONE_NUMBER, EMAIL, POST_URL, LABEL_COL, WRAPPER_COL } from './constants';
import './Form.css';
import SubmitResult from '../SubmitResult/SubmitResult';
import FormItem from '../FormItem/FormItem';
import getInitialValues from './getInitialValue';

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

const Form: FC = () => {
  const [hasError, setError] = useState<boolean | null>(null);

  const sendFormData = async (formData: FormData) => {
    try {
      await axios.post(POST_URL, formData);
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
      labelCol={LABEL_COL}
      wrapperCol={WRAPPER_COL}
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
