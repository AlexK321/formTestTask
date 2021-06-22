import React, { ReactElement } from 'react';
import './App.css';
import Form from './components/Form/Form';
import 'antd/dist/antd.css';

const App = (): ReactElement => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="form-title">Заявка на участие</h1>
        <h2 className="form-description">
          Расскажите о проекте, его ценности для бизнеса, оставьте информацию о компании и
          контакты,чтобы мы могли с вами связаться
        </h2>
        <Form />
      </div>
    </div>
  );
};

export default App;
