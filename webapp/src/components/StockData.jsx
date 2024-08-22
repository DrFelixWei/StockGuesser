import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const StockData = () => {
  const [stockData, setStockData] = useState(null);
  const [snapshotLoading, setSnapshotLoading] = useState(false);

  const [snapShotDate, setSnapshotDate] = useState(null);

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
    if (!stockData) return;
    const lastDate = new Date(stockData.prices[stockData?.prices?.length - 1].date);
    lastDate.setDate(lastDate.getDate() + 1); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setSnapshotDate(lastDate.toLocaleDateString('en-US', options));
  }, [stockData]);

  const backgroundColor = '#1e1e1e'
  const foregroundColor = '#ffffff'
  const backgroundColor2 = '#444444'

  const options = {
    chart: {
      zoomType: null, 
      zooming: {
        mouseWheel: false,
      },
      height: 300,
      width: 500,
      backgroundColor: backgroundColor, 
    },
    title: {
      text: `${stockData?.name} ${snapShotDate}`,
      style: {
        color: foregroundColor, 
      },
    },
    series: [
      {
        type: 'candlestick',
        name: 'Stock Price',
        data: stockData?.prices?.map(price => [
          new Date(price.date).getTime(),
          price.open,
          price.high,
          price.low,
          price.close,
        ]) || [],
        color: 'red',      
        upColor: 'green', 
      },
    ],
    scrollbar: { enabled: false },
    xAxis: {
      type: 'datetime',
      title: {
        enabled: false,
        text: 'Date',
      },
      tickPositions: [
        stockData?.prices?.length > 0 && new Date(stockData?.prices[0].date).getTime(),
        stockData?.prices?.length > 0 && new Date(stockData?.prices[stockData?.prices?.length - 1].date).getTime(), 
      ],
      scrollbar : {
        enabled: false
      },
      labels: {
        style: {
          color: foregroundColor
        },
      },
      lineColor: foregroundColor,
      tickColor: foregroundColor,
      minPadding: 0.05,
      maxPadding: 0.05, 
    },
    yAxis: {
      title: {
        text: 'Price (USD)',
        style: {
          color: foregroundColor
        },
      },
      opposite: false,
      tickAmount: 5, 
      labels: {
        style: {
          color: foregroundColor
        },
      },
      gridLineColor: backgroundColor2,
      lineColor: foregroundColor,
      tickColor: foregroundColor,
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
          {/* <Typography variant='h3'>{stockData?.name}</Typography> */}
          {/* <Typography variant='body1'>{JSON.stringify(stockData?.prices, null, 2)}</Typography> */}
          <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
        </Box>
      )}
    </>
  );
};

export default StockData;
