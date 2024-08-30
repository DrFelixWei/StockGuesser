import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, IconButton, Container, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
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
    const [guess, setGuess] = useState(0);
    const [score, setScore] = useState(0);
    const [scoreHistory, setScoreHistory] = useState([]);

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
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        scores[today] = finalScore;
        localStorage.setItem('scores', JSON.stringify(scores));
    };

    const getScoreHistoryFromLocalStorage = () => {
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        setScoreHistory(scores);
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        getScoreHistoryFromLocalStorage();
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    const stockDataRef = useRef();
    const submitGuess = (value) => {
        setGuess(value);
        const finalScore = calculateScore();
        setScore(finalScore);
        saveScoreToLocalStorage(finalScore);
        handleOpenModal();

        if (stockDataRef.current) {
            stockDataRef.current.revealAnswer();
        }
    };

    const [guessed, setGuessed] = useState(false);
    const checkIfGuessedToday = () => {
        const today = new Date().toISOString().split('T')[0]; 
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        console.log(scores[today])
        if (scores[today]) {
            setGuessed(true);
        } else {
            setGuessed(false);
        }
    };
    useEffect(() => {
        checkIfGuessedToday();
    }, []);
    useEffect(() => {
        setOpenModal(guessed);
    }, [guessed]);


    return (
        <Box>
            <StyledContainer>
                <StockData updateScoreFromUnlockHistory={updateScoreFromUnlockHistory} setAnswer={setAnswer} ref={stockDataRef} />
            </StyledContainer>
            
            <UserInput submitGuess={submitGuess} alreadyGuessed={guessed} />

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    position: 'relative',
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Result
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Score: {score}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Score History:
                    </Typography>
                    {Object.keys(scoreHistory).length > 0 ? (
                        Object.entries(scoreHistory).map(([date, score], index) => (
                            <Typography key={index} variant="body1">
                                {date}: {score}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body1">No score history available.</Typography>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default Landing;
