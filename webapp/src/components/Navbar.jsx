import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { HelpOutline, BarChart } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Title = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const Navbar = ({ isSmallScreen, clickOnHelp, clickOnStats }) => {
  return (
    <Box
      width="90%" 
      margin="auto"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
    >
      <Tooltip title="Help">
        <IconButton onClick={clickOnHelp}>
          <HelpOutline style={{ backgroundColor: '#e0e0e0', borderRadius: '50%' }} />
        </IconButton>
      </Tooltip>

      <Typography variant={ isSmallScreen ? 'h5' : 'h4'}>
        Stock Guesser
      </Typography>

      <Tooltip title="Statistics">
        <IconButton onClick={clickOnStats}>
          <BarChart style={{ backgroundColor: '#e0e0e0', borderRadius: '50%' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Navbar;
