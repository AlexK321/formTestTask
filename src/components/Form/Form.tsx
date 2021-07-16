import React, { FC, useState } from 'react';
import { Form as FormComponent } from 'antd';
import axios from 'axios';
import { USER_NAME, PHONE_NUMBER, EMAIL, LABEL_COL, WRAPPER_COL, POST_URL } from './constants';
import './Form.less';
import SubmitResult from '../SubmitResult/SubmitResult';
import FormItem from '../FormItem/FormItem';
import SubmitBlock from '../SubmitBlock/SubmitBlock';
import SMSBlock from '../SMSBlock/SMSBlock';
import getInitialValues from './getInitialValue';
import handleChange from './handleChange';
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
  const [hasError, setHasError] = useState<boolean | null>(null);
  const [isSMSItem, setSMSItem] = useState<boolean | null>(false);

  const SMSResendTimer = useSMSResendTimer();

  const onFormButtonClick = (formData: FormData) => {
    setTimeDelay();
    setSMSItem(true);
    formDataValues = formData;
  };

  const sendFormData = async (): Promise<void> => {
    try {
      await axios.post(POST_URL, formDataValues);
      setHasError(false);
    } catch (err) {
      setHasError(true);
    }
  };

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
        <SMSBlock setSMSItem={setSMSItem} sendFormData={sendFormData} />
      )}
    </FormComponent>
  );
};

export default Form;
