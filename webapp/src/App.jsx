import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StockData from './components/StockData';
import UserInput from './components/UserInput';
import Admin from './pages/Admin'; 
import './App.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#0c2830',
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
  backgroundColor: '#444444',
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  color: theme.palette.text.primary,
}));

function App() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const maxPoints = 1000;
  const [points, setPoints] = useState(maxPoints);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Root>
          <VerticalLine style={{ left: 0 }} />
          <VerticalLine style={{ right: 0 }} />
          <Box display="flex" flexDirection="column" alignItems="center" width="100%">
            <Navbar isSmallScreen={isSmallScreen} />

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <StyledContainer>
                      <StockData />
                    </StyledContainer>
                    <UserInput />
                  </>
                }
              />
              <Route path="/admin1111" element={<Admin />} />
            </Routes>
          </Box>
        </Root>
      </Router>
    </ThemeProvider>
  );
}

export default App;
