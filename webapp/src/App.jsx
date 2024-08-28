import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './pages/Admin'; 
import Landing from './pages/Landing'; 
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



function App() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
              <Route path="/" element={<Landing/>}/>
              <Route path="/admin1111" element={<Admin />} />
            </Routes>

          </Box>
        </Root>
      </Router>
    </ThemeProvider>
  );
}

export default App;
