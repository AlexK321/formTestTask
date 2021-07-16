import React, { FC } from 'react';
import './SubmitResult.less';

const SubmitResult: FC = () => {
  return (
    <div className="result-wrapper">
      <div className="result-block">
        <h2>Данные формы отправлены успешно</h2>
      </div>
    </div>
  );
};

export default SubmitResult;
