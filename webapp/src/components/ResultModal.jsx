import React, { useEffect, useState } from 'react';
import { Typography, Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CelebrationAnimation from './CelebrationAnimation'; // Import your animation component

const ResultModal = ({ open, handleCloseModal, score, scoreHistory }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 2000); // Adjust duration to match animation length
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'black',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        position: 'relative',
      }}>

        <Box display="flex" alignItems="center" justifyContent="space-between">

          <Typography id="modal-title" variant="h5">
            Result
          </Typography>

          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

        </Box>

        <Typography variant="h5" id="modal-description" sx={{ mt: 2 }} textAlign={'center'}>
          Score: <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>{score}</Typography>
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          <br />
          Previous Score History:
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

        <CelebrationAnimation animate={animate} /> {/* Add animation component */}

      </Box>
    </Modal>
  );
};

export default ResultModal;
