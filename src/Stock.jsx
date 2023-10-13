import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default function Stock() {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [hideRaw, setHideRaw] = useState(true);

  function fetchStock() {
    const API_KEY = import.meta.env.VITE_ALPHAVANTGE_API_KEY;
    let StockSymbol = "AMZN";
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${StockSymbol}&interval=5min&apikey=${API_KEY}`;

    // replace with API_CALL
    fetch("./src/TestDataIBM.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newStockChartXValue = [];
        const newStockChartYValue = [];
        for (var key in data["Time Series (5min)"]) {
          newStockChartXValue.push(key);
          newStockChartYValue.push(data["Time Series (5min)"][key]["1. open"]);
        }
        setStockChartXValues(newStockChartXValue);
        setStockChartYValues(newStockChartYValue);
      });
  }
  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div>
      <h1>Stock Market</h1>
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 720, height: 440, title: "A Fancy Plot" }}
      />
      <div>
        <button
          className="border border-black text-black p-2 mx-4 hover:bg-slate-200"
          onClick={() => {
            setHideRaw(!hideRaw);
          }}
        >
          Raw Data
        </button>
      </div>
      {hideRaw ? (
        <div className="flex mx-4">
          <ul>
            Time
            {stockChartXValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
          <ul className="mx-4">
            Price
            {stockChartYValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
