import React, { useState } from "react";
import styles from "./styles.module.scss";
import { searchStocks } from "../../api/finance";

function StockSearch({ createStockChart }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);

  async function fetchSearchResults() {
    setOpen(true);
    const results = await searchStocks(search);
    setSearchResults(results);
  }

  function onSearch(e) {
    setSearchResults([]);
    setSearch(e.target.value);
  }

  return (
    <div className={styles.autocompleteContainer}>
      <input type='text' value={search} onChange={onSearch} />
      {open && (
        <ul className={styles.autocompleteResults}>
          {searchResults.map(result => {
            const symbol = result["1. symbol"];

            return (
              <li
                className={styles.searchResult}
                key={symbol}
                data-symbol={symbol}
                onClick={e => {
                  createStockChart(e.target.dataset.symbol);
                  setOpen(false);
                }}
              >
                {symbol} {result["2. name"]}
              </li>
            );
          })}
        </ul>
      )}
      <button className='button--primary' onClick={fetchSearchResults}>
        🔍
      </button>
    </div>
  );
}

export default StockSearch;
