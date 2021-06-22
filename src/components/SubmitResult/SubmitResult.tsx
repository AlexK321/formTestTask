import React, { ReactElement } from 'react';
import './SubmitResult.css';

interface ParamTypes {
  status: number;
}

const SubmitResult = ({ status }: ParamTypes): ReactElement => {
  const description =
    status > 399
      ? `Данные формы не отправлены. Ошибка: ${status}`
      : `Данные формы отправлены успешно. Статус ответа: ${status}`;

  return (
    <div className="result-block">
      <h2>{description}</h2>
    </div>
  );
};

export default SubmitResult;
