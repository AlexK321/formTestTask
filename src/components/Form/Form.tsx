import React, { ReactElement, useState } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './Form.css';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import SubmitResult from '../SubmitResult/SubmitResult';

interface ValuesType {
  email: string | undefined;
  telephone: string | undefined;
  userName: string | undefined;
}

const labelCol = { span: 8 };
const wrapperCol = { span: 16 };

const wrapperColForButton = { offset: 8, span: 16 };

const FormComponent = (): ReactElement => {
  const [requestStatus, setRequestStatus] = useState<number | null>(null);
  const onFinish = (values: ValuesType) => {
    console.log('Success:', values);
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        response.json();
        console.log(response.status);
        setRequestStatus(response.status);
      })
      .then((json) => console.log(json));
  };

  if (requestStatus) return <SubmitResult status={requestStatus} />;
  const onFinishFailed = (errorInfo: ValidateErrorEntity<ValuesType>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h2>Контакты</h2>
      <Form.Item
        noStyle
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Ваше имя" />
      </Form.Item>
      <Form.Item
        style={{ width: '100%' }}
        name="telephone"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Телефон" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="E-mail" />
      </Form.Item>

      <Form.Item wrapperCol={wrapperColForButton} style={{ width: '100%' }}>
        <Button type="primary" htmlType="submit">
          Отправить заявку
        </Button>
      </Form.Item>
      <p>Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных</p>
    </Form>
  );
};

export default FormComponent;
