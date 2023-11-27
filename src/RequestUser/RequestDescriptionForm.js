import React, { useCallback ,useEffect,useState} from 'react';
import './RequestDescriptionForm.css';
import { useTelegram } from "../Hooks/useTelegram";

const RequestDescriptionForm = ({ request }) => {

    const { tg,queryId } = useTelegram();

    const Onclose = () => {
        tg.close()
        console.log('dsds')
    }

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
        fetch('https://tg-server-0ckm.onrender.com/replyToOperator', {
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
                    <button type="button" onClick={onSendData}>Закрыть заявку</button>
                    <button type="button" onClick={onSendData}>Ответить</button>
                    <button type="button" onClick={onSendData}>Отправить фото</button>
                </div>
            );
        } else if (request.status === 'В работе') {
            return (
                <div>
                    <button type="button">Закрыть заявку</button>
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
                    <textarea type="text" id="dialog" name="dialog" value={request.dialog} readOnly />
                </div>
                {renderButtons()}
            </form>
        </div>
    );
};

export default RequestDescriptionForm;