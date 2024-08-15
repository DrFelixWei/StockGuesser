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
    chart: {
      zoomType: null, // Disable zooming
      zooming: {
        mouseWheel: false,
      }
    },
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
        color: 'red',      // Color for negative candles
        upColor: 'green',  // Color for positive candles
      },
    ],
    scrollbar: { enabled: false },
    xAxis: {
      type: 'datetime',
      title: {
        enabled: false,
        text: 'Date',
      },
      scrollbar : {
        enabled: false
      },
      // minPadding: 0.05,  
      // maxPadding: 0.05, 
    },
    yAxis: {
      title: {
        text: 'Price (USD)',
      },
      opposite: false,
    },
    rangeSelector: {
      enabled: false, // Disable the range selector (zoom options)
    },
    navigator: {
      enabled: false, // Optionally disable the navigator (mini chart at the bottom)
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
