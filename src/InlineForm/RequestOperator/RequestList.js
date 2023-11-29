import './RequestList.css';
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../Hooks/useTelegram";
import axios from 'axios';
import { Link } from 'react-router-dom';

const RequestUserList = () => {
  const { tg, queryId } = useTelegram();
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    tg.MainButton.hide()
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tg-server-0ckm.onrender.com/req`);
        setDataArray(response.data.map(item => ({
          id: item.id,
          status: item.status,
          messageReq: item.messageReq,
          username: item.username,
        })));
      } catch (error) {
        console.error('Ошибка при получении данных о заявке:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="request-list">
      <div className="request-header">
        <div className="header-item">ID</div>
        <div className="header-item">Никнейм пользователя</div>
        <div className="header-item">Тема заявки</div>
        <div className="header-item">Статус заявки</div>
      </div>
      {dataArray.length > 0 ? (
        dataArray.map((request) => (
          <Link to={`/requestsOperator/${request.id}`} key={request.id} className="request-link">
            <div className="request-item">
              <div className="request-id">{request.id}</div>
              <div className="request-nicknameUser">{request.username}</div>
              <div className="request-subject">{request.messageReq}</div>
              <div className="request-status">{request.status}</div>
            </div>
          </Link>
        ))
      ) : (
        <div>Загрузка данных...</div>
      )}
    </div>
  );
};

export default RequestUserList;
