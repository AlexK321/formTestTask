import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { Form as FormComponent } from 'antd';
import { USER_NAME, PHONE_NUMBER, EMAIL, LABEL_COL, WRAPPER_COL, MILLISECONDS } from './constants';
import './Form.less';
import FormItem from '../FormItem/FormItem';
import SubmitBlock from '../SubmitBlock/SubmitBlock';
import SMSBlock from '../SMSBlock/SMSBlock';
import getInitialValues from './getInitialValue';
import handleChange from './handleChange';
import saveTimeDelay from './saveTimeDelay';
import { FormData } from '../../Types/interfaces';

const initialValue = {
  userName: localStorage.getItem(USER_NAME) || '',
  phoneNumber: localStorage.getItem(PHONE_NUMBER) || '',
  email: localStorage.getItem(EMAIL) || '',
};

const Form: FC = () => {
  const [isSMSBlock, setSMSBlock] = useState<boolean | null>(false);
  const [formDataValues, setFormDataValues] = useState<FormData>();
  const [recoveryTime, setRecoveryTime] = useState<number>(0);
  const timer: MutableRefObject<any> = useRef<number>();

  useEffect(() => {
    const localStorageFinishDate = JSON.parse(localStorage.getItem('finishDate') || '0');
    const initialRecoveryTime = (localStorageFinishDate - Number(new Date())) / MILLISECONDS;

    if (initialRecoveryTime > 0) {
      setRecoveryTime(Math.round(initialRecoveryTime));
      timer.current = setInterval(() => {
        setRecoveryTime((previousRecoveryTime) => previousRecoveryTime - 1);
      }, MILLISECONDS);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [isSMSBlock]);

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
