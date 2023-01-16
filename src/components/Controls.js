import React from "react";

function Controls({
  setInterval,
  from_date,
  fromTimeStampHandler,
  to_date,
  toTimeStampHandler,
}) {
  return (
    <form className="controls">
      <div className="date_container">
        <div className="form_group">
          <label htmlFor="from_timestamp">From:</label>
          <input
            type={"date"}
            name="from_timestamp"
            id="from_timestamp"
            value={from_date}
            onChange={fromTimeStampHandler}
          />
        </div>
        <div className="form_group">
          <label htmlFor="to_timestamp">To:</label>
          <input
            type={"date"}
            name="to_timestamp"
            id="to_timestamp"
            value={to_date}
            onChange={toTimeStampHandler}
          />
        </div>
      </div>
      <div className="interval_container">
        <p>Interval</p>
        <div className="interval_values">
          <p
            onClick={() => {
              setInterval("1d");
            }}
          >
            1 day
          </p>
          <p
            onClick={() => {
              setInterval("1wk");
            }}
          >
            1 week
          </p>
          <p
            onClick={() => {
              setInterval("1mo");
            }}
          >
            1 month
          </p>
        </div>
      </div>
    </form>
  );
}

export default Controls;
