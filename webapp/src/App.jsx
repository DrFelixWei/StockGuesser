import React from 'react';
import { Container, CssBaseline, Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import StockData from './components/StockData';
import './App.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#000000',
    },
    text: {
      primary: '#F5F5F5',
    },
  },
});

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  position: 'relative',
  width: '100vw',
  maxWidth: '100vh',
  overflow: 'hidden',
}));

const VerticalLine = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '4px',
  backgroundColor: theme.palette.text.primary,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: 'white',
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  color: theme.palette.text.primary,
}));

const Title = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

function App() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        <VerticalLine style={{ left: 0 }} />
        <VerticalLine style={{ right: 0 }} />
        <Box display="flex" flexDirection="column" alignItems="center" width="100%">
          <Title variant="h1" component="h1" style={{ fontSize: isSmallScreen ? '2rem' : '3rem' }}>
            Stock Guesser
          </Title>

          {/* <StyledContainer>
            <StockData />
          </StyledContainer> */}
        </Box>
      </Root>
    </ThemeProvider>
  );
}

export default App;
