import React, { FC, useState } from 'react';
import { Form as FormComponent } from 'antd';
import { USER_NAME, PHONE_NUMBER, EMAIL, LABEL_COL, WRAPPER_COL } from './constants';
import './Form.less';
import FormItem from '../FormItem/FormItem';
import SubmitBlock from '../SubmitBlock/SubmitBlock';
import SMSBlock from '../SMSBlock/SMSBlock';
import getInitialValues from './getInitialValue';
import handleChange from './handleChange';
import saveTimeDelay from './saveTimeDelay';
import { FormData } from '../../Types/interfaces';
import useRecoveryTimer from '../../hooks/useRecoveryTimer';

const initialValue = {
  userName: localStorage.getItem(USER_NAME) || '',
  phoneNumber: localStorage.getItem(PHONE_NUMBER) || '',
  email: localStorage.getItem(EMAIL) || '',
};

const Form: FC = () => {
  const [isSMSBlock, setSMSBlock] = useState<boolean | null>(false);
  const [formDataValues, setFormDataValues] = useState<FormData>();
  const recoveryTime = useRecoveryTimer(isSMSBlock);

  const onFormButtonClick = (formData: FormData) => {
    saveTimeDelay();
    setSMSBlock(true);
    setFormDataValues(formData);
  };

  return (
    <FormComponent
      labelCol={LABEL_COL}
      wrapperCol={WRAPPER_COL}
      initialValues={getInitialValues(initialValue)}
      onFinish={onFormButtonClick}
      onValuesChange={handleChange}
    >
      <h2>Контакты</h2>
      <FormItem name={USER_NAME} placeholder="Ваше имя" />
      <div className="form-row">
        <FormItem name={PHONE_NUMBER} placeholder="Телефон" />
        <FormItem name={EMAIL} placeholder="E-mail" />
      </div>
      {isSMSBlock ? (
        <SMSBlock setSMSBlock={setSMSBlock} formDataValues={formDataValues} />
      ) : (
        <SubmitBlock recoveryTime={recoveryTime} />
      )}
    </FormComponent>
  );
};

export default Form;
