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
          width: 500,
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
         
          <Typography variant="h3" sx={{ mt: 3 }}>
              HOW TO PLAY
          </Typography>

          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ margin: 1 }}>
              description
          </Box>

      </Box>
    </Modal>
  );
};

export default HelpModal;
