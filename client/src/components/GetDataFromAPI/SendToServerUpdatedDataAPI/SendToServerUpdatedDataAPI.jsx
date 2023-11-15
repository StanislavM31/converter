import React, { useEffect, useState } from 'react';
import { useCurrency } from '../../Context/CurrencyContext';
import axios from 'axios';

const SendToServerUpdatedDataAPI = ({ data }) => {
  const [sendToLocalStatus, setSendToLocalStatus] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { go, setGo } = useCurrency();

  useEffect(() => {
    const sendToLocalServer = async (data) => {
      try {
        const response = await axios.post('http://localhost:5000/', data);

        if (response.status === 200) {
          setSendToLocalStatus('Successfully! ');
          setIsSuccess(true);
          setGo(true);
        } else {
          console.error('Error uploading to the server (port 5000).');
          setSendToLocalStatus('Error. NOT UPLOADED');
          setIsSuccess(false);
        }
      } catch (error) {
        setSendToLocalStatus('Error. NOT UPLOADED');
        setIsSuccess(false);
      }
    };

    if (data) {
      sendToLocalServer(data);
    }
  }, [data, setGo]);

  return (
    <p>
      Loading on local server: {sendToLocalStatus}
      {isSuccess ? <span>&#9989;</span> : <span>&#10060;</span>}

    </p>
  );
};

export default SendToServerUpdatedDataAPI;
