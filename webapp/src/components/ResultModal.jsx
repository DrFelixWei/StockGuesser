import React from 'react';
import { Typography, Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ResultModal = ({ open, handleCloseModal, score, scoreHistory}) => {

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
  );
};

export default ResultModal;
