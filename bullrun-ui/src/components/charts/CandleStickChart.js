import React from "react";
import ReactApexChart from "react-apexcharts";

class CandleStickChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        title: {
          text: props.title,
          align: "left"
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      },
      series: [
        {
          data: Object.entries(props.data).map(([key, value]) => ({
            x: new Date(key),
            y: Object.values(value).map(parseFloat).slice(0, 4)
          }))
        }
      ]
    };
  }

  render() {
    return (
      <div id='chart'>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type='candlestick'
          height='450'
        />
      </div>
    );
  }
}

export default CandleStickChart;