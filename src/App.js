import { useEffect } from 'react';
import './App.css';
import RequestList from './RequestOperator/RequestList';

const tg = window.Telegram.WebApp

function App() {

  useEffect(()=>{
    tg.ready()
  }, [])

  const onClose = () =>{
    tg.close()
  }

  return (
    <div className="App">
      <RequestList/>
      <button onClick={onClose}></button>
    </div>
  );
}

export default App;
