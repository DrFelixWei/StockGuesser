import React, { useState } from 'react';

const GenerateStock = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error before making a new request

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/stock/generateRandom`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      if (response === null) {
        throw new Error("NULL RESPONSE FROM MARKETSTACK API")
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Generating...' : 'Generate A Random Stock Snapshot'}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div>
          <h3>Random Stock Data</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GenerateStock;
