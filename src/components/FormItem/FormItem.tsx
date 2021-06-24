import React, { ReactElement } from 'react';
import { Form, Input } from 'antd';
import './FormItem.css';

interface Props {
  name: string | undefined;
  placeholder: string | undefined;
  rules?: Array<any>;
}

const defaultRules = [
  { required: true, message: 'Поле не должно быть пустым' },
  {
    max: 10,
    message: `Максимальная длинна строки - 10 символов`,
  },
];

const FormItem = ({ name, placeholder, rules }: Props): ReactElement => {
  const rulesItem = rules || defaultRules;
  return (
    <Form.Item name={name} rules={rulesItem}>
      <Input name={name} placeholder={placeholder} />
    </Form.Item>
  );
};

export default FormItem;
