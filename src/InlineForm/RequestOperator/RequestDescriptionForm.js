import React, { useCallback, useEffect, useState } from 'react';
import './RequestDescriptionForm.css';
import { useTelegram } from "../Hooks/useTelegram";
import axios from 'axios';

const RequestDescriptionForm = ({ request }) => {
    const [dataArray, setDataArray] = useState([]);
    const { tg, queryId } = useTelegram();
     
    const idu = request.userRequestId
     
    const SendData = () => {
        // console.log(userRequestId, userRequestId, userRequestId)
        console.log(request);
        tg.sendData(`/lol ${request.username}`)
        // tg.close()
    }
    const sendPhoto = useCallback(() =>{
        tg.sendData(`/resToOperatorPhoto ${idu}`)
    })

    const userj = request.username;
    const ss = useCallback(() => {

        const data = {
            userj,
            userj,
            userj
        }
        tg.sendData(JSON.stringify(data));
        console.log(JSON.stringify(data))
    }, [userj]);



    const id = request.userRequestId;
    const rep = useCallback(() => {

        tg.sendData(`/resToUser ${id}`)
        console.log(JSON.stringify(data))
    }, [id])
    

    const onSendData = useCallback(() => {

        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
            userId: request.userId
        }
        fetch('https://tg-server-0ckm.onrender.com/replyToUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });        tg.close();
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

    const handleShowPhoto = (idMedia) => {
        console.log(idMedia);
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
            idMedia,
        }
        fetch('https://tg-server-0ckm.onrender.com/handleShowPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
      };




    const test = () =>{
        fetch('https://tg-server-0ckm.onrender.com/test', {
            method: 'POST'
        })
    }

    const onSendPhoto = useCallback(() => {
       
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
        });
        tg.close();
    }, [request])

    // const photoToChat = useCallback((id) => {
    //     // // tg.close();
    //     // const data = {
    //     //     userRequestId: request.userRequestId,
    //     //     username: request.username,
    //     //     queryId,
    //     // }
    //     // fetch('https://tg-server-0ckm.onrender.com/replyToOperatorPhoto', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     //     body: JSON.stringify(data)
    //     // })
    //     console.log(id)
    // }, [request])
    

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
                <div>
                    {dataArray.length > 0 ? (
                        dataArray.map((med) => (
                            <div className="request-item">
                                <div className="request-id">{med.id}</div>
                                <div className="request-nicknameUser">{med.idMedia}</div>
                                <div className="request-subject">{med.UserRequestId}</div>
                                <div>
                                <button type="button" onClick={() => handleShowPhoto(med.id)}>Показать фото</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Загрузка данных...</div>
                    )}
                </div>

            </form>
        </div>
    );
};

export default RequestDescriptionForm;