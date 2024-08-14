import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';

const StockData = () => {
  const [stockData, setStockData] = useState(null);
  const [snapshotLoading, setSnapshotLoading] = useState(false);

  const fetchSnapshot = async () => {
    setSnapshotLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stock/getRandom`);
    const result = await response.json();
    setStockData(result);
    setSnapshotLoading(false);
  };

  // serves as componentDidMount
  useEffect(() => {
    fetchSnapshot()
  }, []);

  useEffect(() => {
    console.log('stockData:', stockData);
  }, [stockData]);


  return (
    <>
      {snapshotLoading && <Typography variant='h3'>fetching stock data...</Typography>}
      {stockData && (
        <Box>
          <Typography variant='h3'>{stockData?.name}</Typography>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </Box>
      )}
    </>
  );
};

export default StockData;
