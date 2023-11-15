import React from 'react';
import { useCurrency } from '../Context/CurrencyContext';
import style from "./style.module.css";
import handleMultiplierChange from "../../functions/updateMultiplier";
export default function StaticCurrencyConverter() {
  const { arrayContext } = useCurrency();

  const filteredCurrencies = arrayContext
  ? arrayContext.filter((currency) => [451, 431, 456, 777].includes(currency.Cur_ID))
  : [];

//далее странный код который обрабатывает 777 (это вручную добавленный элемент бел.руб)
//с которым я работаю на статичном массиве из array
// потому что весь массив по API это в отношении бел рубля.
if (arrayContext && ![451, 431, 456].some(id => filteredCurrencies.some(currency => currency.Cur_ID === id))) {
  const currency777 = arrayContext.find(currency => currency.Cur_ID === 777);
  if (currency777) {
    filteredCurrencies.push(currency777);
  }
}

  return (
<div className={style.staticConvertor}>
  {filteredCurrencies.map((currency) => (
    <div key={currency.Cur_ID} className={style.block}>
      <input
      readOnly
        type="number"
        value={currency.finalCost}
        name={currency.Cur_Abbreviation}
      /> <span>{currency.Cur_Name}</span>({currency.Cur_Scale}{currency.Cur_Abbreviation})
      <div></div>
    </div>
  ))}
</div>

  );
}
