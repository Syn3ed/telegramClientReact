import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import './App.css';
import RequestList from './RequestOperator/RequestList';
import RequestListDesc from './RequestOperator/RequestListDesc';
import RequestUserList from './RequestUser/RequestUserList';
import RequestUserDesc from './RequestUser/RequestUserDesc';
import InlineRequestUserDes from './InlineForm/RequestUser/RequestUserDesc'
import InlineRequestListDesc from './InlineForm/RequestOperator/RequestListDesc'
import FormReq from './FormReq/FormReq'
import loadList from './load'


const tg = window.Telegram.WebApp

function App() {

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequestList />} />
        <Route path="/RequestList" element={<RequestList />} />
        <Route path="/requestsOperator/:id" element={<RequestListDesc />} />
        <Route path="/RequestUserList/:id" element={<RequestUserList />} />
        <Route path="/requests/:id" element={<RequestUserDesc />} />
        <Route path="/Inlinerequests/:id" element={<InlineRequestUserDes />} />
        <Route path="/InlinerequestsOperator/:id" element={<InlineRequestListDesc />} />
        <Route path="/FormReq" element={<FormReq />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// <Route path="/" element={<RequestUserList />} />  
//         <Route path="/requests/:id" element={<RequestUserDesc />} />  