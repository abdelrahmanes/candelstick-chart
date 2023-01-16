import axios from "axios";
import papaparse from "papaparse";
import { useEffect, useState } from "react";
import Chart from "./components/Chart";
import Controls from "./components/Controls";
import "./styles/App.css";

function App() {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("1d");
  const [from_date, setFromDate] = useState("2021-10-01");
  const [to_date, setToDate] = useState("2022-10-01");
  const fromTimeStampHandler = (e) => {
    setFromDate(e.target.value);
  };
  const toTimeStampHandler = (e) => {
    setToDate(e.target.value);
  };

  const getData = () => {
    let ticker = "SPUS";
    let from_timestamp = +new Date(from_date) / 1000;
    let to_timestamp = +new Date(to_date) / 1000;
    let url = `https://query1.finance.yahoo.com/v7/finance/download/${ticker}?period1=${from_timestamp}&period2=${to_timestamp}&interval=${interval}&events=history`;
    axios
      .get(url)
      .then(async (res) => {
        const data = await res.data;
        //convert CSV to JSON
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
  }, [interval, from_date, to_date]);
  return (
    <>
      <Controls
        toTimeStampHandler={toTimeStampHandler}
        fromTimeStampHandler={fromTimeStampHandler}
        interval={interval}
        setInterval={setInterval}
        from_date={from_date}
        to_date={to_date}
      />
      <Chart data={data} />
    </>
  );
}

export default App;
