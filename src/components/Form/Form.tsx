import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Form as FormComponent, Button } from 'antd';
import './Form.css';
import axios from 'axios';
import SubmitResult from '../SubmitResult/SubmitResult';
import FormItem from '../FormItem/FormItem';

interface FormDataType {
  email?: string;
  phoneNumber?: string;
  userName?: string;
}

const formItemsNames: Array<string> = ['userName', 'phoneNumber', 'email'];
const labelCol = { span: 8 };
const wrapperCol = { span: 16 };

const rules = [
  { required: true, message: 'Поле не должно быть пустым' },
  {
    max: 10,
    message: `Максимальная длинна строки - 10 символов`,
  },
];

const Form = (): ReactElement => {
  const [initialValues, setInitialValues] = useState<FormDataType>({
    userName: localStorage.getItem(formItemsNames[0]) || '',
    phoneNumber: localStorage.getItem(formItemsNames[1]) || '',
    email: localStorage.getItem(formItemsNames[2]) || '',
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const filled = url.searchParams.get('filled');
    if (filled === '0') {
      url.searchParams.delete('filled');
      document.location.href = url.toString();
    } else {
      const formFields = Object.keys(initialValues);
      formFields.forEach((item: string, index) => {
        if (index + 1 > Number(filled)) setInitialValues({ ...initialValues, [item]: '' });
      });
    }
    console.log(initialValues);
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
  console.log(initialValues);

  return (
    <FormComponent
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <h2>Контакты</h2>
      <FormItem name="userName" placeholder="Ваше имя" handleChange={handleChange} rules={rules} />
      <div className="form-row">
        <FormItem
          name="phoneNumber"
          placeholder="Телефон"
          handleChange={handleChange}
          rules={rules}
        />
        <FormItem name="email" placeholder="E-mail" handleChange={handleChange} rules={rules} />
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
