// CurrencyBlock.jsx
import React from "react";
import style from "./style.module.css";

const CurrencyBlock = ({
  currency,
  handleMultiplierChange,
  handleRemoveCurrencyFromPage,
  handleFocus,
}) => {

  return (
    <div className={style.block}>
      <input
        type="number"
        value={currency.finalCost}
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
  );
};

export default CurrencyBlock;
