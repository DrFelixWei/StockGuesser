import React from 'react';
import { Typography, Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StatsModal = ({ 
  open, 
  handleCloseModal, 
  stats, 
  scoreHistory
}) => {


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
          width: 350,
          bgcolor: 'black',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          position: 'relative',
      }}>

         
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5">
                STATISTICS
            </Typography>
          
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                  // position: 'absolute',
                  // top: 8,
                  // right: 8,
                  color: (theme) => theme.palette.grey[500],
              }}
            >
                <CloseIcon />
            </IconButton>

          </Box>


          {stats &&
            <Box display="flex" alignItems="top" justifyContent="space-between">
              {Object.entries(stats).map(([key, value]) => (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ margin: 1 }}
                  key={key} // Add a unique key for each mapped element
                >
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {value}
                  </Typography>
                  <Typography variant="h6" textAlign="center">
                    {key}
                  </Typography>
                </Box>
              ))}
            </Box>
          }


          <Box>
            <Typography variant="h5" sx={{ mt: 3 }}>
                Previous Scores
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

      </Box>
    </Modal>
  );
};

export default StatsModal;
