import React from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import CandleStickChart from "../charts/CandleStickChart";
import styles from "./styles.module.scss";

const ReactGridLayout = WidthProvider(GridLayout);

function FinanceGrid({ charts }) {
  return (
    <section className={styles.financeGrid}>
      <h2>Your Dashboard</h2>
      <p>
        Drag, drop, rearrange and resize your tiles to get the best view for
        your financial data.
      </p>
      <ReactGridLayout cols={4} style={{ zIndex: 0 }}>
        {charts.map(({ symbol, data }, idx) => {
          return (
            <div
              data-grid={{
                x: idx,
                y: 0,
                w: 1,
                h: 3,
                i: symbol,
                minH: 3,
                minW: 1
              }}
              key={symbol}
              className={styles.chartCard}
            >
              <CandleStickChart data={data} title={symbol} />
            </div>
          );
        })}
      </ReactGridLayout>
    </section>
  );
}

export default FinanceGrid;
