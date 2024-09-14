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

      <Title variant="h1" component="h1" style={{ fontSize: isSmallScreen ? '2rem' : '3rem' }}>
        Stock Guesser
      </Title>

      <Tooltip title="Statistics">
        <IconButton onClick={clickOnStats}>
          <BarChart />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default Navbar;
