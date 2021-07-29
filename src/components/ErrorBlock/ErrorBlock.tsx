import React, { FC } from 'react';
import './ErrorBlock.less';

interface ParamTypes {
  error?: string;
}

const ErrorBlock: FC<ParamTypes> = ({ error }) => {
  return (
    <div className="error-wrapper">
      <div className="error-block">
        <h2>Что-то пошло не так</h2>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ErrorBlock;
