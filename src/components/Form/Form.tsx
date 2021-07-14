import React, { FC, useState } from 'react';
import { Form as FormComponent } from 'antd';
import axios from 'axios';
import {
  USER_NAME,
  PHONE_NUMBER,
  EMAIL,
  POST_URL,
  LABEL_COL,
  WRAPPER_COL,
  CORRECT_SMS_CODE,
  TIME_DELAY,
} from './constants';
import './Form.less';
import SubmitResult from '../SubmitResult/SubmitResult';
import ErrorState from '../ErrorState/ErrorState';
import FormItem from '../FormItem/FormItem';
import SubmitBlock from '../SubmitBlock/SubmitBlock';
import SMSBlock from '../SMSBlock/SMSBlock';
import getInitialValues from './getInitialValue';
import useSMSResendTimer from '../../hooks/useSMSResendTimer';

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
let formDataValues: FormData = {};

const Form: FC = () => {
  const [error, setError] = useState<string | null>();
  const [hasError, setHasError] = useState<boolean | null>(null);
  const [isSMSItem, setSMSItem] = useState<boolean | null>(true);
  const [counterSMS, setCounterSMS] = useState<number>(0);

  const SMSResendTimer = useSMSResendTimer();

  const setTimeDelay = (formData: FormData) => {
    const date: Date = new Date();
    const finishDate = date.setSeconds(date.getSeconds() + TIME_DELAY);

    localStorage.setItem('finishDate', JSON.stringify(finishDate));
    setSMSItem(false);
    formDataValues = formData;
  };

  const sendFormData = async (formData: FormData) => {
    try {
      await axios.post(POST_URL, formData);
      setHasError(false);
    } catch (err) {
      setHasError(true);
    }
  };

  const handleChange = (formData: FormData): void => {
    const formDataEntries = Object.entries(formData);
    const [key, value] = formDataEntries[0];

    localStorage.setItem(key, value);
  };

  const onSearch = async (SMSCode: string) => {
    try {
      const response = await axios.post(POST_URL, { SMSCode });

      if (response.data.SMSCode === CORRECT_SMS_CODE) {
        sendFormData(formDataValues);
      } else {
        setCounterSMS(counterSMS + 1);
        const smsField = document.getElementById('smsField');

        smsField?.classList.add('error');

        if (counterSMS === 2) {
          setSMSItem(true);
          setCounterSMS(0);
        }
      }
    } catch (err) {
      setError(err);
    }
  };

  if (error) return <ErrorState error={error} />;

  if (hasError !== null) return <SubmitResult hasError={hasError} />;

  return (
    <FormComponent
      labelCol={LABEL_COL}
      wrapperCol={WRAPPER_COL}
      initialValues={getInitialValues(initialValue)}
      onFinish={setTimeDelay}
      onValuesChange={handleChange}
    >
      <h2>Контакты</h2>
      <FormItem name={USER_NAME} placeholder="Ваше имя" />
      <div className="form-row">
        <FormItem name={PHONE_NUMBER} placeholder="Телефон" />
        <FormItem name={EMAIL} placeholder="E-mail" />
      </div>
      {isSMSItem ? (
        <SubmitBlock SMSResendTimer={SMSResendTimer} />
      ) : (
        <SMSBlock
          counterSMS={counterSMS}
          onSearch={onSearch}
          setSMSItem={setSMSItem}
          setCounterSMS={setCounterSMS}
        />
      )}
    </FormComponent>
  );
};

export default Form;
