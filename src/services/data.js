import mainService from "./mainService";

// https://query1.finance.yahoo.com/v7/finance/download/{ticker}?period1={from_timestamp}&period2={to_timestamp}&interval={interval}&events=history

// ticker = SPUS
// from_timestamp = timestamp
// to_timestamp = timestamp
// interval = {1d|1wk|1mo}

export function getData(ticker, from_timestamp, to_timestamp, interval) {
  return mainService
    .get(
      `/download/${ticker}?period1=${from_timestamp}&period2=${to_timestamp}&interval=${interval}&events=history`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
