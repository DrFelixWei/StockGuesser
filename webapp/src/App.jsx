import React from 'react';
import { Container, CssBaseline, Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import StockData from './components/StockData';
import './App.css';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
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
  maxWidth: '600px',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Root>
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center" width="100%">
        <Title variant="h1" component="h1" style={{ fontSize: isSmallScreen ? '2rem' : '3rem' }}>
          Stock Guesser
        </Title>

        {/* <StyledContainer>
          <StockData />
        </StyledContainer> */}
        
      </Box>
    </Root>
  );
}

export default App;
