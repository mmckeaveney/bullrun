import React, { useState } from "react";
import { fetchForexQuotes, fetchStockQuote } from "../../api/finance";
import GridLayout from "./GridLayout";
import ChartCreationControls from "../ChartCreationControls";

function FinanceGrid() {
  const [charts, setCharts] = useState([]);

  function createForexChart(from = "USD", to = "GBP") {
    fetchForexQuotes({ from, to }).then(data => {
      setCharts([
        ...charts,
        {
          symbol: `${from}/${to}`,
          data
        }
      ]);
    });
  }

  function createStockChart(symbol) {
    fetchStockQuote(symbol).then(data => {
      setCharts([
        ...charts,
        {
          symbol,
          data
        }
      ]);
    });
  }

  return (
    <section>
      <ChartCreationControls
        createForexChart={createForexChart}
        createStockChart={createStockChart}
      />
      <GridLayout charts={charts} />
    </section>
  );
}

export default FinanceGrid;
