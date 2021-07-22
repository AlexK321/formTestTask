import React, { FC, useContext, useState } from 'react';
import './SMSBlock.less';
import { Button } from 'antd';
import Search from 'antd/lib/input/Search';
import classNames from 'classnames';
import axios from 'axios';
import { CORRECT_SMS_CODE, MAX_SMS_CODE_ATTEMPTS, POST_URL } from '../Form/constants';
import Context from '../../Context';
import SubmitResult from '../SubmitResult/SubmitResult';
import { FormData } from '../../Types/interfaces';

interface ParamTypes {
  setSMSBlock: (arg0: boolean) => void;
  formDataValues?: FormData;
}

const SMSBlock: FC<ParamTypes> = ({ setSMSBlock, formDataValues }) => {
  const [SMSSubmitCounter, setSMSSubmitCounter] = useState<number>(0);
  const [isSubmitResult, setSubmitResult] = useState<boolean | null>(false);
  const setError = useContext(Context);

  const onSubmit = async (SMSCode: string): Promise<void> => {
    try {
      const response = await axios.post(POST_URL, {
        smsCode: SMSCode,
        formData: formDataValues,
      });

      if (response.data.smsCode === CORRECT_SMS_CODE) {
        setSubmitResult(true);
      } else {
        setSMSSubmitCounter((previousCounter) => previousCounter + 1);

        if (SMSSubmitCounter === MAX_SMS_CODE_ATTEMPTS - 1) {
          setSMSBlock(false);
          setSMSSubmitCounter(0);
        }
      }
    } catch (err) {
      setError(err);
    }
  };

  if (isSubmitResult) return <SubmitResult />;

  const SMSCodeAttempts = MAX_SMS_CODE_ATTEMPTS - SMSSubmitCounter;

  return (
    <div className={classNames('form-row sms-field', { 'error-class': SMSSubmitCounter > 0 })}>
      <div>
        <Search placeholder="SMS-код" enterButton=">" size="large" onSearch={onSubmit} />
        {SMSSubmitCounter > 0 && (
          <p className="sms-warning">Неправильный код. Осталось {SMSCodeAttempts} попытки.</p>
        )}
      </div>
      <Button
        type="link"
        onClick={() => {
          setSMSBlock(false);
          setSMSSubmitCounter(0);
        }}
      >
        Отправить еще раз или изменить номер
      </Button>
    </div>
  );
};

export default SMSBlock;
