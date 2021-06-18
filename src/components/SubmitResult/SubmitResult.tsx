import React from 'react';
import 'antd/dist/antd.css';
import './SubmitResult.css';

interface ParamTypes {
  status: number;
}

const SubmitResult = ({ status }: ParamTypes): any => {
  console.log(status);
  let description = '';
  if (status > 399) {
    description = `Данные формы не отправлены. Ошибка: ${status}`;
  } else {
    description = `Данные формы отправлены успешно. Статус ответа: ${status}`;
  }

  return (
    <div className="result_block">
      <h2>{description}</h2>
    </div>
  );
};

export default SubmitResult;
