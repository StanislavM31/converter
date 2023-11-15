import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {

  const [arrayContext, setArrayOfCur] = useState([]);
  const [go, setGo] = useState(false);

  const updateInContext = (newArray) => {
    setArrayOfCur(newArray);
  };

  return (
    <CurrencyContext.Provider value={{arrayContext, updateInContext, go, setGo}}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency Error');
  }
  return context;
};
