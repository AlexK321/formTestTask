import React, { FC } from 'react';
import './SMSBlock.less';
import { Button } from 'antd';
import Search from 'antd/lib/input/Search';

interface ParamTypes {
  counterSMS: number;
  onSearch: (arg0: string) => void;
  setSMSItem: (arg0: boolean) => void;
  setCounterSMS: (arg0: number) => void;
}

const SMSBlock: FC<ParamTypes> = ({ counterSMS, onSearch, setSMSItem, setCounterSMS }) => {
  return (
    <div className="form-row sms-field" id="smsField">
      <div>
        <Search placeholder="SMS-код" enterButton=">" size="large" onSearch={onSearch} />
        {counterSMS > 0 && (
          <p className="sms-warning">Неправильный код. Осталось {3 - counterSMS} попытки.</p>
        )}
      </div>
      <Button
        type="link"
        onClick={() => {
          setSMSItem(true);
          setCounterSMS(0);
        }}
      >
        Отправить еще раз или изменить номер
      </Button>
    </div>
  );
};

export default SMSBlock;
