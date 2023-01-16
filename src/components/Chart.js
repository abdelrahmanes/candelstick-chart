import React from "react";
import CanvasJSReact from "./canvasjs/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Chart({ data }) {
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

  return (
    <div className="chart-container">
      <CanvasJSChart options={options} />
    </div>
  );
}

export default Chart;
