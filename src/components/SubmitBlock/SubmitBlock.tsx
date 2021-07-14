import React, { FC } from 'react';
import './SubmitBlock.less';
import { Button } from 'antd';

interface ParamTypes {
  SMSResendTimer: number;
}

const SubmitBlock: FC<ParamTypes> = ({ SMSResendTimer }) => {
  return (
    <div className="form-row">
      <Button type="primary" htmlType="submit" disabled={Boolean(SMSResendTimer > 0)}>
        Отправить заявку {SMSResendTimer > 0 && `через ${SMSResendTimer} сек.`}
      </Button>
      <p className="form-description">
        Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных
      </p>
    </div>
  );
};

export default SubmitBlock;
