import React, { useState } from 'react';
import { Slider, Box, TextField } from '@mui/material';
import { styled } from '@mui/system';

// Function to calculate color based on value
const getColorFromValue = (value) => {
  const normalizedValue = (value + 100) / 200; // Normalize value to range [0, 1]
  const red = Math.min(255, Math.max(0, Math.round((1 - normalizedValue) * 255)));
  const green = Math.min(255, Math.max(0, Math.round(normalizedValue * 255)));
  return `rgb(${red}, ${green}, 0)`;
};

// Custom styled Box for vertical slider
const VerticalSlider = styled(Slider)(({ theme, color }) => ({
  height: '150px', // Adjust the height as needed
  '& .MuiSlider-thumb': {
    width: 24,
    height: 24,
    backgroundColor: color,
    border: '2px solid #fff',
  },
  '& .MuiSlider-track': {
    height: 4,
    backgroundColor: color,
  },
  '& .MuiSlider-rail': {
    height: 4,
    backgroundColor: theme.palette.grey[400], // Default rail color
  },
}));

const UserInput = () => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= -100 && newValue <= 100) {
      setValue(newValue);
    }
  };

  // Calculate color based on slider value
  const sliderColor = getColorFromValue(value);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '400px', justifyContent: 'center' }}>
      <TextField
        label="Value"
        variant="outlined"
        value={value}
        onChange={handleInputChange}
        inputProps={{ min: -100, max: 100, type: 'number' }}
        sx={{ marginRight: 2, width: '100px' }}
      />
      <VerticalSlider
        orientation="vertical"
        value={value}
        onChange={handleSliderChange}
        min={-100}
        max={100}
        aria-labelledby="vertical-slider"
        color={sliderColor} // Pass the color as a prop
      />
    </Box>
  );
};

export default UserInput;
