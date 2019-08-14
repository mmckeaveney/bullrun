import React, { useState } from "react";
import styles from "./styles.module.scss";
import StockSearch from "./StockSearch";

const CONTROL_MAP = {
  FOREX: "forex",
  STOCKS: "stocks"
};

const CURRENCIES = ["USD", "GBP", "EUR", "CAD", "CHF", "AUD", "CNY"];

function ChartCreationControls({ createForexChart, createStockChart }) {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [control, setControl] = useState("stocks");

  return (
    <div className={styles.chartCreationControls}>
      {["forex", "stocks"].map(type => {
        return (
          <span
            onClick={() => setControl(type)}
            className={`${styles.control} ${
              control === type ? styles.selected : ""
            }`}
          >
            {type.toUpperCase()}
          </span>
        );
      })}
      {control === CONTROL_MAP.FOREX && (
        <div>
          <p>
            Choose a forex currency pair to create the intraday exchange rate
            comparison chart in your finance dashboard below.
          </p>
          <select
            className='select'
            onChange={e => setFromCurrency(e.target.value)}
          >
            {CURRENCIES.map(curr => <option value={curr}>{curr}</option>)}
          </select>
          <select
            className='select'
            onChange={e => setToCurrency(e.target.value)}
          >
            {CURRENCIES.map(curr => <option value={curr}>{curr}</option>)}
          </select>
          <button
            className='button--primary'
            onClick={() => createForexChart(fromCurrency, toCurrency)}
          >
            <span>💸</span>
          </button>
        </div>
      )}
      {control === CONTROL_MAP.STOCKS && (
        <>
          <p>
            Search for a stock by its ticker symbol and select it to create the
            daily price chart for the stock in your dashboard below.
          </p>
          <StockSearch createStockChart={createStockChart} />
        </>
      )}
    </div>
  );
}

export default ChartCreationControls;
