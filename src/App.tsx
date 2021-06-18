import React from 'react';
import './App.css';
import FormComponent from './components/Form/Form';

function App() {
  return (
    <div className="wrapper">
      <div className="form_wrapper">
        <h1 className="form_title">Заявка на участие</h1>
        <h2 className="form_description">
          Расскажите о проекте, его ценности для бизнеса, оставьте информацию о компании и
          контакты,чтобы мы могли с вами связаться
        </h2>
        <FormComponent />
      </div>
    </div>
  );
}

export default App;
