import React, { useCallback, useEffect, useState } from 'react';
import './RequestDescriptionForm.css';
import { useTelegram } from "../Hooks/useTelegram";
import axios from 'axios';

const RequestDescriptionForm = ({ request }) => {
    const [dataArray, setDataArray] = useState([]);
    const { tg, queryId } = useTelegram();
    const textareaRef = useRef(null);
    const [height, setHeight] = useState('auto');

    const handleChange = () => {
        setHeight(`${textareaRef.current.scrollHeight}px`);
      };
    // const SendData = () => {
    //     // console.log(userRequestId, userRequestId, userRequestId)
    //     console.log(request)
    //     tg.sendData(`/lol`)
    //     // tg.close()
    // }
    const Onclose = () => {
        tg.close()
        console.log('dsds')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://tg-server-0ckm.onrender.com/reqPhoto/${request.userRequestId}`);
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


    const onSendData = useCallback(() => {
        const data = {
            userRequestId: request.userRequestId,
            username: request.username,
            queryId,
        }
        fetch('https://tg-server-0ckm.onrender.com/replyToOperator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [request])

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
        })
    }, [request])

    const idu = request.userRequestId

    const sendData = useCallback(() => {
        tg.sendData(`/resToOperator ${idu}`)
        // console.log(idu)
    })


    const sendPhoto = useCallback(() => {
        tg.sendData(`/resToOperatorPhoto ${idu}`)
    })

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
                    {/* <button type="button" onClick={onSendData}>Ответить</button> */}
                    <button type="button" onClick={sendPhoto}>Отправить фото</button>
                </div>
            );
        } else if (request.status === 'Заявка в обработке!') {
            return (
                <div>
                    <button type="button" onClick={closeReq}>Закрыть заявку</button>
                    <button type="button" onClick={sendData}>Ответить</button>
                    <button type="button" onClick={sendPhoto}>Отправить фото</button>
                </div>
            );
        }

    }

    return (
        <div className="request-description-form">
            <h2>Описание заявки</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="subject">Тема заявки</label>
                    <input type="text" id="subject" name="subject" value={request.subject} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Адрес</label>
                    <textarea type="text" id="address" name="address" value={request.address} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea type="text" id="description" name="description" value={request.description} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="dialog">Диалог с оператором</label>
                    <textarea type="text" id="dialog" ref={textareaRef} className="auto-resize-textarea" value={request.dialog} onChange={handleChange} readOnly />
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
                                    {/* <button type="button" onClick={() => handleShowPhoto(med.idMedia)}>Показать фото</button> */}
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