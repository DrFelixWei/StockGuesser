import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, IconButton, Container, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Navbar from '../components/Navbar';
import StockData from '../components/StockData';
import UserInput from '../components/UserInput';
import StatsModal from '../components/StatsModal';
import ResultModal from '../components/ResultModal';

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

const Landing = ({ 
    isSmallScreen 
}) => {


    const [answer, setAnswer] = useState(0);
    const [guess, setGuess] = useState(0);
    const [score, setScore] = useState(0);
    const [scoreHistory, setScoreHistory] = useState([]);

    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const [snapShotDate, setSnapshotDate] = useState(today);

    const maxPoints = 1000;

    const updateScoreFromUnlockHistory = (days) => {
        switch (days) {
            case 14:
                setHintsUsed(prevHintsUsed => [...prevHintsUsed, '14 days']);
                break;
            case 28:
                setHintsUsed(prevHintsUsed => [...prevHintsUsed, '28 days']);
                break;
            default:
                break;
        }
    };

    const hints = {
        "14 days": -100,
        "28 days": -300,
    };
    const [hintsUsed, setHintsUsed] = useState([]);

    const calculateScore = () => {
        let maxScore = maxPoints;
        for (const hint of hintsUsed) {
            maxScore += hints[hint];
        }
        const accuracyFactor = Math.abs(answer - guess) / 100;
        const finalScore = maxScore * (1 - accuracyFactor);
        return finalScore;
    };

    const saveScoreToLocalStorage = (finalScore) => {
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        scores[today] = finalScore;
        localStorage.setItem('scores', JSON.stringify(scores));
    };

    const getScoreHistoryFromLocalStorage = () => {
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        setScoreHistory(scores);
    };

    const [openStatsModal, setOpenStatsModal] = useState(false);
    const handleOpenStatsModal = () => {
        getScoreHistoryFromLocalStorage();
        setOpenStatsModal(true);
    };
    const handleCloseStatsModal = () => setOpenStatsModal(false);

    const [openResultModal, setOpenResultModal] = useState(false);
    const handleOpenResultModal = () => {
        getScoreHistoryFromLocalStorage();
        setOpenResultModal(true);
    };
    const handleCloseResultModal = () => setOpenResultModal(false);


    const stockDataRef = useRef();
    const submitGuess = (value) => {
        setGuess(value);
        const finalScore = calculateScore();
        setScore(finalScore);
        saveScoreToLocalStorage(finalScore);
        handleOpenResultModal();

        if (stockDataRef.current) {
            stockDataRef.current.revealAnswer();
        }
    };

    const [guessed, setGuessed] = useState(false);
    const checkIfGuessedToday = () => {
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        if (scores[today]) {
            setGuessed(true);
        } else {
            setGuessed(false);
        }
    };
    useEffect(() => {
        checkIfGuessedToday();
        getScoreHistoryFromLocalStorage();
    }, []);
    useEffect(() => {
        setOpenResultModal(guessed);
    }, [guessed]);


    const navbarClickOnHelp = () => {
        console.log('Help clicked');
    }
    const navbarClickOnStats = () => {
        setOpenStatsModal(true);
    }


    return (
        <Box>
            <Navbar 
                isSmallScreen={isSmallScreen} 
                clickOnHelp={navbarClickOnHelp}
                clickOnStats={navbarClickOnStats}
            />

            <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" padding={2}>
                <IconButton onClick={()=>{}}>
                    <ArrowBackIosIcon style={{ backgroundColor: '#e0e0e0'}}/>
                </IconButton>
                
                <Typography variant="h3" component="h3">
                    Today
                </Typography>
                
                <IconButton onClick={()=>{}}>
                    <ArrowForwardIosIcon style={{ backgroundColor: '#e0e0e0'}}/>
                </IconButton>
            </Box>


            <StyledContainer>
                <StockData 
                    ref={stockDataRef} 
                    date={snapShotDate}
                    updateScoreFromUnlockHistory={updateScoreFromUnlockHistory} 
                    setAnswer={setAnswer} 
                    />
            </StyledContainer>
            
            <UserInput submitGuess={submitGuess} alreadyGuessed={guessed} />

            <StatsModal
                open={openStatsModal}
                handleCloseModal={handleCloseStatsModal}
                scoreHistory={scoreHistory}
            />

            <ResultModal
                open={openResultModal}
                handleCloseModal={handleCloseResultModal}
                score={score}
                scoreHistory={scoreHistory}
            />

        </Box>
    );
};

export default Landing;
