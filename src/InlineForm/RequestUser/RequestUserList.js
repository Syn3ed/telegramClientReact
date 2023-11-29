import './RequestUserList.css'
import React, { useEffect, useState } from 'react';
import { useTelegram } from "../Hooks/useTelegram";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const requestList = [
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
  { id: 1, subject: 'Заявка 1', address: 'Адрес 1', status: 'В ожидании' },
  { id: 2, subject: 'Заявка 2', address: 'Адрес 2', status: 'В обработке' },
  { id: 3, subject: 'Заявка 3', address: 'Адрес 3', status: 'Завершено' },
];

const RequestUserList = () => {
  const { tg, queryId } = useTelegram();
  const { id } = useParams()

  const SendData = () => {
    tg.sendData('/create_request')
    tg.close()
  }
  const MainBut = () => {
    tg.MainButton.hide()
    tg.BackButton.hide()
    tg.MainButton.setParams({
      text: `Создать заявку`
    });
  }

  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tg-server-0ckm.onrender.com/reqUser/${id}`);
        setDataArray(response.data.map(item => ({
          id: item.id,
          status: item.status,
          messageReq: item.messageReq,
          username: item.username,
          category: item.category
        })));
      } catch (error) {
        console.error('Ошибка при получении данных о заявке:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    Telegram.WebApp.onEvent('mainButtonClicked', SendData)
    return () => {
      Telegram.WebApp.offEvent('mainButtonClicked', SendData)
    }
  }, [])

  useEffect(() => {
    console.log(id)
    MainBut();
  }, []);

  return (
    <div className="request-list">
      <div className="request-header">
        <div className="header-item">ID</div>
        <div className="header-item">Тема заявки</div>
        <div className="header-item">Статус заявки</div>
      </div>
      {dataArray.length > 0 ? (
        dataArray.map((request) => (
          <Link to={`/requests/${request.id}`} key={request.id} className="request-link">
            <div className="request-item">
              <div className="request-id">{request.id}</div>
              <div className="request-subject">{request.category}</div>
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