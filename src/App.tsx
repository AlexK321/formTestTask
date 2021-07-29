import React, { ReactElement, useState } from 'react';
import './App.less';
import Form from './components/Form/Form';
import 'antd/dist/antd.less';
import Context from './Context';
import ErrorBlock from './components/ErrorBlock/ErrorBlock';

const App = (): ReactElement => {
  const [error, setError] = useState<string | null>('');

  if (error) return <ErrorBlock error={error} />;

  return (
    <Context.Provider value={setError}>
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
    </Context.Provider>
  );
};

export default App;
