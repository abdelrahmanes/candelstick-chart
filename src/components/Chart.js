import axios from "axios";
import papaparse from "papaparse";
import React, { useEffect, useState } from "react";
import CanvasJSReact from "./canvasjs/canvasjs.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Chart() {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("1d");
  const [from_timestamp, setFromTimeStamp] = useState("");
  const [to_timestamp, setToTimeStamp] = useState("");

  const options = {
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Testing",
    },
    axisX: {
      valueFormatString: "MMMM YY",
    },
    axisY: {
      prefix: "$",
      title: "Price (in USD)",
    },
    data: [
      {
        type: "candlestick",
        showInLegend: true,
        name: "Intel Corporation",
        yValueFormatString: "$###0.00",
        xValueFormatString: "MMMM YY",
        dataPoints: data,
      },
    ],
  };
  const fromTimeStampHandler = (e) => {
    setFromTimeStamp(e.target.value);
  };
  const toTimeStampHandler = (e) => {
    setToTimeStamp(e.target.value);
  };

  const getData = () => {
    let ticker = "SPUS";
    let url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=${
      +new Date(from_timestamp) / 1000
    }&period2=${
      +new Date(to_timestamp) / 1000
    }&interval=${interval}&events=history`;
    axios
      .get(url)
      .then(async (res) => {
        const data = await res.data;
        const json = papaparse.parse(data);
        let formatedData = json.data
          .filter((x, index) => index !== 0)
          .map((entity) => {
            return {
              x: new Date(entity[0]),
              y: [+entity[1], +entity[2], +entity[3], +entity[4]],
            };
          });

        setData(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [interval, from_timestamp, to_timestamp]);

  return (
    <div className="chart-container">
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
      <form>
        <div>
          <label htmlFor="from_timestamp">From:</label>
          <input
            type={"date"}
            name="from_timestamp"
            id="from_timestamp"
            value={from_timestamp}
            onChange={fromTimeStampHandler}
          />
        </div>
        <div>
          <label htmlFor="to_timestamp">To:</label>
          <input
            type={"date"}
            name="to_timestamp"
            id="to_timestamp"
            value={to_timestamp}
            onChange={toTimeStampHandler}
          />
        </div>
        <div>
          <p
            onClick={() => {
              setInterval("1d");
            }}
          >
            1d
          </p>
          <p
            onClick={() => {
              setInterval("1wk");
            }}
          >
            1wk
          </p>
          <p
            onClick={() => {
              setInterval("1mo");
            }}
          >
            1mo
          </p>
        </div>
      </form>
    </div>
  );
}

export default Chart;
