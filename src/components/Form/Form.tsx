import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import SubmitResult from '../SubmitResult/SubmitResult';
import 'antd/dist/antd.css';
import './Form.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormComponent = () => {
  const [requestStatus, setRequestStatus] = useState<number | null>(null);
  const onFinish = (values: any) => {
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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <h2>Контакты</h2>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Ваше имя" />
      </Form.Item>
      <Form.Item
        name="telephone"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Телефон" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="E-mail" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Отправить заявку
        </Button>
      </Form.Item>
      <p>Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных</p>
    </Form>
  );
};

export default FormComponent;
