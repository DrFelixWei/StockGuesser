import React, { useState } from 'react';
import { Typography, Box, Button, Container, CssBaseline,useMediaQuery } from '@mui/material';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import StockData from '../components/StockData';
import UserInput from '../components/UserInput';

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

const Landing = () => {
  
    return (
        <Box>
            <StyledContainer>
                <StockData />
            </StyledContainer>
            
            <UserInput />
        </Box>
    );
};

export default Landing;



