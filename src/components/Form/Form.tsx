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
} from './constants';
import './Form.less';
import SubmitResult from '../SubmitResult/SubmitResult';
import ErrorState from '../ErrorState/ErrorState';
import FormItem from '../FormItem/FormItem';
import SubmitBlock from '../SubmitBlock/SubmitBlock';
import SMSBlock from '../SMSBlock/SMSBlock';
import getInitialValues from './getInitialValue';
import handleChange from './handleChange';
import sendFormData from './sendFormData';
import setTimeDelay from './setTimeDelay';
import useSMSResendTimer from '../../hooks/useSMSResendTimer';
import { FormData } from './interface';

const initialValue = {
  userName: localStorage.getItem(USER_NAME) || '',
  phoneNumber: localStorage.getItem(PHONE_NUMBER) || '',
  email: localStorage.getItem(EMAIL) || '',
};
let formDataValues: FormData = {};

const Form: FC = () => {
  const [error, setError] = useState<string | null>('');
  const [hasError, setHasError] = useState<boolean | null>(null);
  const [isSMSItem, setSMSItem] = useState<boolean | null>(false);
  const [counterSMS, setCounterSMS] = useState<number>(0);

  const SMSResendTimer = useSMSResendTimer();

  const onFormButtonClick = (formData: FormData) => {
    setTimeDelay();
    setSMSItem(true);
    formDataValues = formData;
  };

  const onSubmit = async (SMSCode: string): Promise<void> => {
    try {
      const response = await axios.post(POST_URL, { SMSCode });

      if (response.data.SMSCode === CORRECT_SMS_CODE) {
        sendFormData(formDataValues, setHasError);
      } else {
        setCounterSMS(counterSMS + 1);

        if (counterSMS === 2) {
          setSMSItem(false);
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
      onFinish={onFormButtonClick}
      onValuesChange={handleChange}
    >
      <h2>Контакты</h2>
      <FormItem name={USER_NAME} placeholder="Ваше имя" />
      <div className="form-row">
        <FormItem name={PHONE_NUMBER} placeholder="Телефон" />
        <FormItem name={EMAIL} placeholder="E-mail" />
      </div>
      {!isSMSItem ? (
        <SubmitBlock SMSResendTimer={SMSResendTimer} />
      ) : (
        <SMSBlock
          counterSMS={counterSMS}
          onSearch={onSubmit}
          setSMSItem={setSMSItem}
          setCounterSMS={setCounterSMS}
        />
      )}
    </FormComponent>
  );
};

export default Form;
