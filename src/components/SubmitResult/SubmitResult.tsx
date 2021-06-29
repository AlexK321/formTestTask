import React, { FC } from 'react';
import './SubmitResult.css';

interface ParamTypes {
  hasError: boolean;
}

const SubmitResult: FC<ParamTypes> = ({ hasError }) => {
  const description = hasError ? `Данные формы не отправлены` : `Данные формы отправлены успешно`;

  return (
    <div className="result-block">
      <h2>{description}</h2>
    </div>
  );
};

export default SubmitResult;
