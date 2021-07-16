import React, { FC, useState } from 'react';
import './SMSBlock.less';
import { Button } from 'antd';
import Search from 'antd/lib/input/Search';
import classNames from 'classnames';
import axios from 'axios';
import { CORRECT_SMS_CODE, POST_URL } from '../Form/constants';
import ErrorState from '../ErrorState/ErrorState';

interface ParamTypes {
  setSMSItem: (arg0: boolean) => void;
  sendFormData: () => Promise<void>;
}

const SMSBlock: FC<ParamTypes> = ({ setSMSItem, sendFormData }) => {
  const [error, setError] = useState<string | null>('');
  const [counterSMS, setCounterSMS] = useState<number>(0);
  const SMsBlockClass = classNames('form-row', 'sms-field', { 'error-class': counterSMS > 0 });

  const onSubmit = async (SMSCode: string): Promise<void> => {
    try {
      const response = await axios.post(POST_URL, { SMSCode });

      if (response.data.SMSCode === CORRECT_SMS_CODE) {
        sendFormData();
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

  return (
    <div className={SMsBlockClass} id="smsField">
      <div>
        <Search placeholder="SMS-код" enterButton=">" size="large" onSearch={onSubmit} />
        {counterSMS > 0 && (
          <p className="sms-warning">Неправильный код. Осталось {3 - counterSMS} попытки.</p>
        )}
      </div>
      <Button
        type="link"
        onClick={() => {
          setSMSItem(false);
          setCounterSMS(0);
        }}
      >
        Отправить еще раз или изменить номер
      </Button>
    </div>
  );
};

export default SMSBlock;
