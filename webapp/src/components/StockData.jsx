import React, { useState } from 'react';

const StockData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stock/random`);
    const result = await response.json();
    setData(result);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Random Stock Data</button>
      {loading && <p>Loading...</p>}
      {data && (
        <div>
          <h3>Random Stock Data</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StockData;
