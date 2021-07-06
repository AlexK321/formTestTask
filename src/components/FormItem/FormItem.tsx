import React, { FC } from 'react';
import { Form, Input } from 'antd';
import './FormItem.css';
import { Rule } from 'antd/lib/form';

interface Props {
  name?: string;
  placeholder?: string;
  rules?: Rule[]; // remove any
}

const DEFAULT_RULES = [
  { required: true, message: 'Поле не должно быть пустым' },
  {
    max: 10,
    message: `Максимальная длинна строки - 10 символов`,
  },
];

//webstorm - Ctr+alt+O - vscode analogs

const FormItem: FC<Props> = ({ name, placeholder, rules = DEFAULT_RULES }) => (
  <Form.Item name={name} rules={rules}>
    <Input name={name} placeholder={placeholder} />
  </Form.Item>
);

export default FormItem;
