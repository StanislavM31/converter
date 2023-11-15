import React from "react";
import StaticCurrencyConverter from "./components/StaticCurrencyConverter/StaticCurrencyConverter";

import SuperCurrencySelector from "./components/SuperCurrencySelector/SuperCurrencySelector";
import GetDataFromAPI from "./components/GetDataFromAPI/GetDataFromAPI.jsx";
import { CurrencyProvider } from "./components/Context/CurrencyContext";

export default function App() {
  return (
    <CurrencyProvider>
      <div className="App">
        <div className="AppContainer">
          <h1>Currency Converter</h1>
          <div>
            <GetDataFromAPI />
          </div>
          <div>
            <StaticCurrencyConverter />
            <SuperCurrencySelector />
          </div>
        </div>
      </div>
    </CurrencyProvider>
  );
}
