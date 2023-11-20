import React, { useEffect, useState,useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestDescriptionForm from './RequestDescriptionForm';
import { useTelegram } from "../Hooks/useTelegram";
import axios from 'axios';

const RequestUserDesc = () => {
    const { tg, queryId } = useTelegram();
    const { id } = useParams();
    const navigate = useNavigate();

    const [reqLL, setReqLL] = useState([]);
    const [dataArray, setDataArray] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/mes/${id}`);
                setReqLL(response.data);
                const dataArray = response.data.map(item => ({
                    dialog: item.dialog,
                    userRequestId: item.userRequestId,
                    status: item.status,
                    description: item.description,
                    subject: item.subject,
                    username: item.username,
                    address: item.address
                }));
                MainBut(dataArray[0].status);
                console.log('Full Data Array:', dataArray[0].status);
                setDataArray(dataArray);
            } catch (error) {
                console.error('Ошибка при получении данных о заявке:', error);
            }
        };

        fetchData();
    }, [id]);
    const MainBut = (status) => {
        tg.BackButton.show();
        if (status !== "В работе") {
            tg.MainButton.setParams({
                text: `Дополнить заявку`
            });
        }
    }
    const SendData = () =>{
        tg.sendData('/desMes')
        tg.close()
    }
    const onSendData = useCallback(() => {
        const data = {
            userRequestId: dataArray[0].userRequestId,
            username: dataArray[0].username,
            queryId,
        }
        fetch('http://localhost:3000/replyToUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [dataArray, queryId])


    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return()=>{
             tg.offEvent('mainButtonClicked', onSendData)
            }
    },[])


    useEffect(() => {
        const handleBackButton = () => {
            navigate(-1);
        };
        MainBut(`sd`);
        tg.BackButton.onClick(handleBackButton);
        return () => {
            tg.BackButton.offClick(handleBackButton);
        };
    }, [navigate]);

    return (
        <div>
            {dataArray.length > 0 ? (
                <RequestDescriptionForm
                    request={{
                        dialog: dataArray[0].dialog,
                        userRequestId: dataArray[0].userRequestId,
                        status: dataArray[0].status,
                        description: dataArray[0].description,
                        subject: dataArray[0].subject,
                        username: dataArray[0].username,
                        address: dataArray[0].address,
                    }}
                />
            ) : (
                <div>Загрузка данных...</div>
            )}
        </div>
    );
};
export default RequestUserDesc



// const MainBut = () => {
//     tg.MainButton.show();
//     tg.BackButton.show()
//     tg.MainButton.setParams({
//         text: `Дополнить заявку`
//     });
// }RequestUserDesc

