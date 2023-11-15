import axios from "axios";
import React, { useState, useEffect } from "react";
import updateMultiplier from "../../functions/updateMultiplier";
import style from "./style.module.css";
import debouncedReq from "../../hooks/useDebounce";
import { useCurrency } from '../Context/CurrencyContext';
import NewMultiOnLocal from '../NewMultiOnLocal/NewMultiOnLocal';


export default function SuperCurrencySelector() {
  const [tempState, setTempState] = useState(null);
  const [clickedElement, setClickedElement] = useState("");
  const [listSelected, setListSelected] = useState([]);
  const [availableForSelect, setAvailableForSelect] = useState([]);
  const [arrayOfCur, setArrayOfCur] = useState(null);
  const [multi, setMultiplier] = useState();
  const { updateInContext, go, setGo } = useCurrency();

  useEffect(() => {
    async function getCurrencies() {
      try {
        const response = await axios.get('http://localhost:5000/');
        return response.data;
      } catch (error) {
        console.error("Error fetching currencies:", error);
        return null;
      }
    }

    async function fetchData() {
      setTempState(await getCurrencies());
    }

    fetchData();
  }, [go]);

  useEffect(() => {
      setArrayOfCur(tempState);
      setGo(false);
  }, [tempState]);

  useEffect(() => {
    updateInContext(arrayOfCur);
  }, [arrayOfCur, updateInContext]);

  useEffect(() => {
    if (arrayOfCur && listSelected) {
      // Сюда валюты, которые не находятся на странице
      const notSelectedCurrencies = arrayOfCur.filter(
        (currency) =>
          !listSelected.some(
            (selectedCurrency) => selectedCurrency.Cur_ID === currency.Cur_ID
          )
      );
      // Отфильтрованные валюты в availableForSelect
      setAvailableForSelect(notSelectedCurrencies);
    }
  }, [arrayOfCur, listSelected]);

  const handleMultiplierChange = (e, currency) => {
    <NewMultiOnLocal parameter1={e.target.value} parameter2={currency} />
    console.log("currency", currency);
    const newMultiplierValue = e.target.value;
    setMultiplier(newMultiplierValue);
    setListSelected((prevCurrencies) =>
      prevCurrencies.map((prevCurrency) =>
        prevCurrency.Cur_ID === currency.Cur_ID
          ? { ...prevCurrency, finalCost: newMultiplierValue }
          : prevCurrency
      )
    );
    //вот тут просто пересчитываю массив на фронте
    //а надо бы отправлять на бек))
    const updatedArray = updateMultiplier(
      arrayOfCur,
      newMultiplierValue,
      e.target
    );
    setArrayOfCur(updatedArray);
  };

  const handleAddCurrencyToPage = () => {
    const selected = availableForSelect.find(
      (c) => c.Cur_Name === clickedElement
    );
    if (selected) {
      setListSelected([...listSelected, selected]);
      const updatedavailableForSelect = availableForSelect.filter(
        (c) => c.Cur_Name !== clickedElement
      );
      setAvailableForSelect(updatedavailableForSelect);
      setClickedElement("");
    }
  };

  const handleRemoveCurrencyFromPage = (currency) => {
    setListSelected(
      listSelected.filter((c) => c.Cur_Name !== currency.Cur_Name)
    );
    setAvailableForSelect([...availableForSelect, currency]);
  };

  const handleFocus = (currencyName, inputValue, key) => {
    console.log(
      "key:",
      key,
      "Фокус на:",
      currencyName,
      "со значением:",
      inputValue
    );
  };
  const pullFreshValue = (id) => {
    const selectedCurrency = arrayOfCur.find(
      (currency) => currency.Cur_ID === id
    );

    if (selectedCurrency) {
      return selectedCurrency.finalCost;
    }

    return "noActualElement"; //but it's really imposible))
  };

  return (
    <div className={style.superselector}>
      <div className={style.list}>
        {listSelected.map((currency, index) => (
          <div key={index} className={style.block}>
            <input
              type="number"
              value={pullFreshValue(currency.Cur_ID)}
              onChange={(e) => handleMultiplierChange(e, currency)}
              onFocus={(e) =>
                handleFocus(
                  currency.Cur_Abbreviation,
                  e.target.value,
                  currency.Cur_ID
                )
              }
              name={currency.Cur_Abbreviation}
            />
            <div className="abbreviation">
              ({currency.Cur_Scale}
              {currency.Cur_Abbreviation})
            </div>
            <button
              className={style.deleteBtn}
              onClick={() => handleRemoveCurrencyFromPage(currency)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {availableForSelect && availableForSelect.length > 0 ? (
        <div className={style.selAdd}>
          <select
            value={clickedElement}
            onChange={(e) => setClickedElement(e.target.value)}
          >
            <option value="ChooseCurency">Choose Curency</option>
            {availableForSelect.map((currency) => (
              <option key={currency.Cur_ID} value={currency.Cur_Name}>
                {currency.Cur_Name} ({currency.Cur_Abbreviation})
              </option>
            ))}
          </select>
          <button className={style.addBtn} onClick={handleAddCurrencyToPage}>
            AddCurrency+
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
