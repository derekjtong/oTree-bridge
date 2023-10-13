import { useEffect, useState } from "react";

export default function Stock() {
  const [stockChartXValues, setStockChartXValues] = useState();
  const [stockChartYValues, setStockChartYValues] = useState();

  fecthStock() {

  }
  useEffect({
    fetchStock()
  },[])

  
  return (
    <div>
      <h1>Stock Market</h1>
    </div>
  );
}
