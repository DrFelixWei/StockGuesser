import React from 'react';
import { Typography, Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const HelpModal = ({ 
  open, 
  handleCloseModal,
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
                HOW TO PLAY
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


          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ margin: 1 }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              Every day, a random stock and a random date is chosen.{"\n"}
              We give you clues and you try to guess how much the stock changed in price that day.{"\n"}
              The more hints you use the less points you get.{"\n"}
              {"\n"}
              Use the slider or text box to input your guess.{"\n"}
              Click submit and view your score.{"\n"}
              {"\n"}
              Click on the stats icon in the upper right corner to view your performance history.{"\n"}
              Use the left and right arrows to play other days.
            </Typography>
          </Box>

      </Box>
    </Modal>
  );
};

export default HelpModal;
