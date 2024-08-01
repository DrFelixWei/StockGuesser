import React, { useState } from 'react';

const StockData = () => {
  const [data, setData] = useState(null);
  const [symbol, setSymbol] = useState('');

  const fetchData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stock/historical?symbol=${symbol}`);
    const result = await response.json();
    setData(result);
  };

  return (
    <div>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol"
      />
      <button onClick={fetchData}>Fetch Data</button>
      {data && (
        <div>
          <h3>Stock Data for {symbol}</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StockData;
