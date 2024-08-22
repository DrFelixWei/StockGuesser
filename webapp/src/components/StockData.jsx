import React, { useState, useEffect } from 'react';
import { Box, Stack, Button, CircularProgress, Typography } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const StockData = () => {
  const [stockDataFull, setStockDataFull] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [snapshotLoading, setSnapshotLoading] = useState(false);

  const [snapShotDate, setSnapshotDate] = useState(null);

  const fetchSnapshot = async () => {
    setSnapshotLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/stock/getRandom`);
    const result = await response.json();
    setStockDataFull(result);
    setSnapshotLoading(false);
  };

  useEffect(() => {
    fetchSnapshot();
  }, []);

  useEffect(() => {
    if (!stockDataFull) return;

    const lastDate = new Date(stockDataFull.prices[stockDataFull?.prices?.length - 1].date);
    lastDate.setDate(lastDate.getDate() + 1); 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setSnapshotDate(lastDate.toLocaleDateString('en-US', options));

    const trimmedStockData = {
      ...stockDataFull,
      prices: stockDataFull.prices.slice(-5) // Get the last 5 elements
    };
    setStockData(trimmedStockData);

  }, [stockDataFull]);

  const [buttonStates, setButtonStates] = useState({
    clicked14: false,
    clicked28: false,
  });
  const unlockHistory = (days) => async () => {
    const trimmedStockData = {
      ...stockDataFull,
      prices: stockDataFull.prices.slice(-days) 
    };
    setStockData(trimmedStockData);

    setButtonStates((prevState) => ({
      ...prevState,
      clicked14: days === 14 ? true : prevState.clicked14,
      clicked28: days === 28 ? true : prevState.clicked28,
    }));
  }

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
        data: [
          [new Date(stockData?.prices[0].date).getTime() - 86400000, null, null, null, null], // Extra empty point before the first data point
          ...stockData?.prices?.map(price => [
            new Date(price.date).getTime(),
            price.open,
            price.high,
            price.low,
            price.close,
          ]) || [],
          [new Date(stockData?.prices[stockData?.prices?.length - 1].date).getTime() + 86400000, null, null, null, null], // Extra empty point after the last data point
        ],
        color: 'red',      
        upColor: 'green', 
        dataGrouping: {
          enabled: false, // Disable data grouping to maintain the original spacing
        },
      },
    ],
    plotOptions: {
      candlestick: {
        pointPadding: 0.02,
        groupPadding: 0.02,
      },
    },
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
          <Stack direction='row' spacing={2} justifyContent="center" alignItems="center" sx={{width:'100%'}}>
            <Button onClick={unlockHistory(14)} disabled={buttonStates.clicked14 || buttonStates.clicked28}>2 weeks (100 points)</Button>
            <Button onClick={unlockHistory(28)}  disabled={buttonStates.clicked28}>4 weeks (300 points)</Button>
          </Stack>

          {/* <Typography variant='h3'>{stockData?.name}</Typography> */}
          {/* <Typography variant='body1'>{JSON.stringify(stockData?.prices, null, 2)}</Typography> */}
          <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
        </Box>
      )}
    </>
  );
};

export default StockData;
