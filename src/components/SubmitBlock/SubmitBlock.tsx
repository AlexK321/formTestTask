import React, { FC } from 'react';
import './SubmitBlock.less';
import { Button } from 'antd';

interface ParamTypes {
  recoveryTime: number;
}

const SubmitBlock: FC<ParamTypes> = ({ recoveryTime }) => {
  return (
    <div className="form-row">
      <Button type="primary" htmlType="submit" disabled={Boolean(recoveryTime > 0)}>
        Отправить заявку {recoveryTime > 0 && `через ${recoveryTime} сек.`}
      </Button>
      <p className="form-description">
        Нажимая на кнопку «Отправить заявку», вы соглашаетесь на обработку персональных данных
      </p>
    </div>
  );
};

export default SubmitBlock;
