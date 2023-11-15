import React, { useEffect } from 'react';
import axios from 'axios';

export default function NewMultiOnLocal({ parameter1, parameter2 }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/', {
          parameter1,
          parameter2,
        });
        console.log("==========",parameter1);

        // Обработка успешного ответа
        console.log(response.data);
        // Можете здесь выполнить дополнительные действия с ответом, если нужно
      } catch (error) {
        // Обработка ошибок при отправке запроса
        console.error('Ошибка при отправке запроса:', error);
      }
    };

    // Вызываем функцию fetchData сразу после монтирования компонента
    fetchData();
  }, [parameter1, parameter2]);

  return null;
}