import React, { useState, useEffect } from 'react';
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
    marginBottom: theme.spacing(2),
  }));

const Landing = () => {

    const [answer, setAnswer] = useState(0);
    useEffect(() => {
        console.log('Answer:', answer);
    }, [answer]);

    const maxPoints = 1000;
    const [points, setPoints] = useState(maxPoints);

    const updateScoreFromUnlockHistory = (days) => {
        console.log('Days:', days);
    };

    const calculateScore = () => {
    };
    
    

    const submitGuess = (value) => {
        console.log('Submitted value:', value);
    };
  
    return (
        <Box>
            <StyledContainer>
                <StockData updateScoreFromUnlockHistory={updateScoreFromUnlockHistory} setAnswer={setAnswer}/>
            </StyledContainer>
            
            <UserInput submitGuess={submitGuess}/>
        </Box>
    );
};

export default Landing;



