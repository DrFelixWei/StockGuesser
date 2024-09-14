// CelebrationAnimation.js
import React from 'react';
import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';

const celebrateAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const CelebrationAnimation = ({ animate }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        display: animate ? 'block' : 'none',
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '3rem',
          color: 'gold',
          animation: `${celebrateAnimation} 2s ease-in-out`,
        }}
      >
        🎉🎉🎉
      </Box>
    </Box>
  );
};

export default CelebrationAnimation;
