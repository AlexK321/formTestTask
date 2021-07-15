import React, { FC } from 'react';
import './SMSBlock.less';
import { Button } from 'antd';
import Search from 'antd/lib/input/Search';
import classNames from 'classnames';

interface ParamTypes {
  counterSMS: number;
  onSearch: (arg0: string) => void;
  setSMSItem: (arg0: boolean) => void;
  setCounterSMS: (arg0: number) => void;
}

const SMSBlock: FC<ParamTypes> = ({ counterSMS, onSearch, setSMSItem, setCounterSMS }) => {
  const SMsBlockClass = classNames('form-row', 'sms-field', { 'error-class': counterSMS > 0 });

  return (
    <div className={SMsBlockClass} id="smsField">
      <div>
        <Search placeholder="SMS-код" enterButton=">" size="large" onSearch={onSearch} />
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
