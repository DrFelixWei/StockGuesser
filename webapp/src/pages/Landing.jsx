import React, { useState, useEffect, useRef } from 'react'
import { Typography, Box, IconButton, Container, Modal } from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import Navbar from '../components/Navbar'
import StockData from '../components/StockData'
import UserInput from '../components/UserInput'
import StatsModal from '../components/StatsModal'
import ResultModal from '../components/ResultModal'
import HelpModal from '../components/HelpModal'

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
}))

const Landing = ({ 
    isSmallScreen 
}) => {

    const [validSnapshot, setValidSnapshot] = useState(false)
    const [answer, setAnswer] = useState(0)
    const [guess, setGuess] = useState(0)
    const [score, setScore] = useState(0)
    const [stats, setStats] = useState({
            "Played" : 0,
            "Average Score" : 0,
            "Best Score" : 0,
    })
    const [scoreHistory, setScoreHistory] = useState([])

    const today = new Date().toISOString().split('T')[0] // Get today's date in 'YYYY-MM-DD' format
    console.log(today)
    const [snapShotDate, setSnapshotDate] = useState(today)

    const changeDate = (days) => {
        const date = new Date(snapShotDate)
        date.setDate(date.getDate() + days)
        setSnapshotDate(date.toISOString().split('T')[0])
    }

    const maxPoints = 1000

    const updateScoreFromUnlockHistory = (days) => {
        switch (days) {
            case 14:
                setHintsUsed(prevHintsUsed => [...prevHintsUsed, '14 days'])
                break
            case 28:
                setHintsUsed(prevHintsUsed => [...prevHintsUsed, '28 days'])
                break
            default:
                break
        }
    }

    const hints = {
        "14 days": -100,
        "28 days": -300,
    }
    const [hintsUsed, setHintsUsed] = useState([])

    const calculateScore = () => {
        let maxScore = maxPoints
        for (const hint of hintsUsed) {
            maxScore += hints[hint]
        }
        const accuracyFactor = Math.abs(answer - guess) / 100
        const finalScore = maxScore * (1 - accuracyFactor)
        return Math.round(finalScore)
    }

    const saveScoreToLocalStorage = (finalScore) => {
        const scores = JSON.parse(localStorage.getItem('scores')) || {}
        scores[today] = finalScore
        localStorage.setItem('scores', JSON.stringify(scores))
    }

    const getScoreHistoryFromLocalStorage = () => {
        const scores = JSON.parse(localStorage.getItem('scores')) || {}
        setScoreHistory(scores)
    }

    useEffect(() => {
        if (scoreHistory) {
            const scores = Object.values(scoreHistory).map(score => Math.round(score))
            const totalScore = scores.reduce((acc, score) => acc + score, 0)
            const averageScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0
            const bestScore = scores.length > 0 ? Math.max(...scores) : 0
            let stats = { 
                "Played": scores.length, 
                "Average Score": averageScore, 
                "Best Score": bestScore 
            }
            setStats(stats)
        }
    }, [scoreHistory])
    
    const [openStatsModal, setOpenStatsModal] = useState(false)
    const handleOpenStatsModal = () => {
        getScoreHistoryFromLocalStorage()
        setOpenStatsModal(true)
    }
    const handleCloseStatsModal = () => setOpenStatsModal(false)

    const [openResultModal, setOpenResultModal] = useState(false)
    const handleOpenResultModal = () => {
        getScoreHistoryFromLocalStorage()
        setOpenResultModal(true)
    }
    const handleCloseResultModal = () => setOpenResultModal(false)


    const stockDataRef = useRef()
    const submitGuess = (value) => {
        setGuess(value)
        const finalScore = calculateScore()
        setScore(finalScore)
        saveScoreToLocalStorage(finalScore)
        handleOpenResultModal()

        if (stockDataRef.current) {
            stockDataRef.current.revealAnswer()
        }
    }

    const [guessed, setGuessed] = useState(false)
    const checkIfGuessedToday = () => {
        const scores = JSON.parse(localStorage.getItem('scores')) || {}
        if (scores[today]) {
            setGuessed(true)
        } else {
            setGuessed(false)
        }
    }
    useEffect(() => {
        checkIfGuessedToday()
        getScoreHistoryFromLocalStorage()
    }, [])
    useEffect(() => {
        setOpenResultModal(guessed)
    }, [guessed])


    const [openHelpModal, setOpenHelpModal] = useState(false)
    const navbarClickOnHelp = () => {
        setOpenHelpModal(true)
    }
    const handleCloseHelpModal = () => setOpenHelpModal(false)

    const navbarClickOnStats = () => {
        setOpenStatsModal(true)
    }


    return (
        <Box>
            <Navbar 
                isSmallScreen={isSmallScreen} 
                clickOnHelp={navbarClickOnHelp}
                clickOnStats={navbarClickOnStats}
            />

            <Box width="90%" margin="auto" display="flex" alignItems="center" justifyContent="space-between" padding={2}>

                <IconButton onClick={()=>changeDate(-1)} disabled={snapShotDate === '2024-09-14'}>
                    <ArrowBackIosIcon style={{ backgroundColor: '#e0e0e0', borderRadius: '50%', paddingLeft: '6px' }}/>
                </IconButton>
                
                <Typography variant="h5" component="h3">
                    {/* {snapShotDate} */}
                    { snapShotDate === today ? "Today" : snapShotDate}
                </Typography>
                
                <IconButton onClick={()=>changeDate(1)} disabled={snapShotDate === today}>
                    <ArrowForwardIosIcon style={{ backgroundColor: '#e0e0e0', borderRadius: '50%', padding: '3px' }}/>
                </IconButton>
                
            </Box>


            <StyledContainer>
                <StockData 
                    ref={stockDataRef} 
                    date={snapShotDate}
                    updateScoreFromUnlockHistory={updateScoreFromUnlockHistory} 
                    setValidSnapshot={setValidSnapshot}
                    setAnswer={setAnswer} 
                    />
            </StyledContainer>
            
            { validSnapshot &&
                <UserInput submitGuess={submitGuess} alreadyGuessed={guessed} />
            }

            <StatsModal
                open={openStatsModal}
                handleCloseModal={handleCloseStatsModal}
                stats={stats}
                scoreHistory={scoreHistory}
            />

            <ResultModal
                open={openResultModal}
                handleCloseModal={handleCloseResultModal}
                score={score}
                stats={stats}
                scoreHistory={scoreHistory}
            />

            <HelpModal
                open={openHelpModal}
                handleCloseModal={handleCloseHelpModal}
            />

        </Box>
    )
}

export default Landing
