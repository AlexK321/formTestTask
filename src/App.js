import React from 'react'
import Main from './components/main/main'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import './App.scss';

function App() {
  return (
    <div className="App">
        <Header/>
        <Main/>
        <Footer/>
    </div>
  );
}

export default App;
