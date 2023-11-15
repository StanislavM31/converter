import axios from "axios";
import React, { useState, useEffect } from 'react';
import {updateDataAPI} from '../../functions/updateDataAPI';
import SendToServerUpdatedDataAPI from './SendToServerUpdatedDataAPI/SendToServerUpdatedDataAPI';

export default function GetDataFromAPI() {
  const api = "https://api.nbrb.by/exrates/rates?periodicity=0";
  const [currencyRates, setCurrencyRates] = useState(null);
  const [updatedData, setUpdatedData] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let attempts = 0;
      let success = false;

      while (!success && attempts < 4 && attempts !== "goOn") {
        try {
          const response = await axios.get(api);

          if (response.status >= 200 && response.status < 300) {
            console.log(`Data from ${api} has been received.`);
            // ответ от сервера есть и это массив из response.data
            if (response.data && response.data.length > 0) {
              success = true;
              setCurrencyRates(response.data);
              attempts = "goOn";
            } else {
              console.warn("response is ok, but not array");
            }
          } else {
            console.error("Error API");
          }
        } catch (error) {
          console.error("Error request", error);
        } finally {
          attempts++;
        }
      }

      setIsLoading(false);
      setIsSuccess(success);
    };

    if (isLoading) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (currencyRates) {
      const modified = updateDataAPI(currencyRates);
      setUpdatedData(modified);
    }
  }, [currencyRates]);

  return (
    <div>
      {isLoading && <p>Loading from API... <span style={{ color: '#FFD700' }}>Loading &#10036;</span></p>}
      {!isLoading && isSuccess && <p>Data from API received Successfully!&nbsp;<span> &#9989;</span></p>}
      {!isLoading && !isSuccess && <p style={{ color: 'red' }}>ERROR: no connection</p>}
      <SendToServerUpdatedDataAPI data={updatedData} />
    </div>
  )
}
