import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

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

  useEffect(() => {
    fetchSnapshot();
  }, []);

  useEffect(() => {
    console.log('stockData:', stockData);
  }, [stockData]);

  const options = {
    title: {
      text: stockData?.name,
    },
    series: [
      {
        type: 'candlestick',
        name: 'Stock Price',
        data: stockData?.prices?.map(price => [
          new Date(price.date).getTime(), // Convert date to timestamp
          price.open,
          price.high,
          price.low,
          price.close,
        ]) || [],
      },
    ],
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Price',
      },
    },
  };

  return (
    <>
      {snapshotLoading && <CircularProgress />}
      {stockData && (
        <Box>
          <Typography variant='h3'>{stockData?.name}</Typography>
          {/* <Typography variant='body1'>{JSON.stringify(stockData?.prices, null, 2)}</Typography> */}
          <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
        </Box>
      )}
    </>
  );
};

export default StockData;
