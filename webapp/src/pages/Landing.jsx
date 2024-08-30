import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, IconButton, Container, CssBaseline, useMediaQuery, Modal } from '@mui/material';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
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
    useEffect(() => {
        console.log('Answer:', answer);
    }, [answer]);

    const [guess, setGuess] = useState(0);
    const [score, setScore] = useState(0);

    const maxPoints = 1000;
    const [points, setPoints] = useState(maxPoints);

    const updateScoreFromUnlockHistory = (days) => {
        console.log('Days:', days);
    };

    const calculateScore = () => {
        return 1000;
    };
    
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const stockDataRef = useRef();
    const submitGuess = (value) => {
        console.log('Submitted value:', value);
        setGuess(value);
        setScore(calculateScore());
        setOpenModal(true);

        if (stockDataRef.current) {
            stockDataRef.current.revealAnswer();
        }
    };

    return (
        <Box>
            <StyledContainer>
                <StockData updateScoreFromUnlockHistory={updateScoreFromUnlockHistory} setAnswer={setAnswer} ref={stockDataRef} />
            </StyledContainer>
            
            <UserInput submitGuess={submitGuess} />

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    // position: 'absolute',
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
                </Box>
            </Modal>
        </Box>
    );
};

export default Landing;
