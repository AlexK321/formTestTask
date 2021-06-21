import React, { ChangeEvent, ReactElement } from 'react';
import { Form, Input } from 'antd';
import 'antd/dist/antd.css';
import './FormItem.css';

interface Props {
  name: string | undefined;
  placeholder: string | undefined;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  rules: Array<any>;
}

const FormItem = ({ name, placeholder, handleChange, rules }: Props): ReactElement => {
  return (
    <Form.Item name={name} rules={rules}>
      <Input name={name} placeholder={placeholder} onChange={handleChange} />
    </Form.Item>
  );
};

export default FormItem;
