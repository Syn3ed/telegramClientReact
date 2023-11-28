import React, { useCallback, useEffect, useState } from 'react';
import './RequestDescriptionForm.css';
import { useTelegram } from "../Hooks/useTelegram";
import axios from 'axios';

const RequestDescriptionForm = ({ request }) => {
    const [dataArray, setDataArray] = useState([]);
    const { tg, queryId } = useTelegram();



    const onSendData = useCallback(() => {
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
        }
        fetch('https://tg-server-0ckm.onrender.com/replyToUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [request])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://tg-server-0ckm.onrender.com/reqPhoto/${request.userRequestId}`);
                //   setDataArray(response.data.map(item => ({
                //     id: item.id,
                //     idMedia: item.idMedia,
                //     UserRequestId: item.UserRequestId
                //   })));

                const dataArray = response.data.map(item => ({
                    id: item.id,
                    idMedia: item.idMedia,
                    UserRequestId: item.UserRequestId
                }));
                setDataArray(dataArray);
                console.log(dataArray);
            } catch (error) {
                console.error('Ошибка при получении данных', error);
            }
        };
        fetchData();
    }, [request]);

    const onSendPhoto = useCallback(() => {
        // tg.close();
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
        }
        fetch('https://tg-server-0ckm.onrender.com/replyToOperatorPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [request])

    const closeReq = useCallback(() => {
        tg.close();
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
        }
        fetch('https://tg-server-0ckm.onrender.com/closeReq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [request])

    const renderButtons = () => {
        if (request.status === 'ожидает ответа оператора') {
            return (
                <div>
                    <button type="button" onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" onClick={onSendData}>Ответить</button>
                    <button type="button" onClick={onSendPhoto}>Отправить фото</button>
                </div>
            );
        } else if (request.status === 'Заявка в обработке!') {
            return (
                <div>
                    <button type="button" onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" onClick={onSendData}>Ответить</button>
                    <button type="button" onClick={onSendPhoto}>Отправить фото</button>
                </div>
            );
        }
    }

    return (
        <div className="request-description-form">
            <h2>Описание заявки</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Никенейм пользователя</label>
                    <input type="text" id="username" name="username" value={request.username} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Тема заявки</label>
                    <input type="text" id="subject" name="subject" value={request.subject} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Адрес</label>
                    <input type="text" id="address" name="address" value={request.address} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <input type="text" id="description" name="description" value={request.description} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="dialog">Диалог с оператором</label>
                    <textarea type="text" id="dialog" name="dialog" value={request.dialog} readOnly />
                </div>
                {renderButtons()}
            </form>
        </div>
    );
};

export default RequestDescriptionForm;