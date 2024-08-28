import React, { useState } from 'react';
import { Slider, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const maxChange = 10;

const getColorFromValue = (value) => {
  const normalizedValue = (value + maxChange) / (maxChange*2); 
  const red = Math.min(255, Math.max(0, Math.round((1 - normalizedValue) * 255)));
  const green = Math.min(255, Math.max(0, Math.round(normalizedValue * 255)));
  return `rgb(${red}, ${green}, 0)`;
};

// Custom styled Box for horizontal slider
const HorizontalSlider = styled(Slider)(({ theme, color }) => ({
  width: '100%', 
  '& .MuiSlider-thumb': {
    width: 25, 
    height: 30, 
    backgroundColor: color,
    border: '2px solid #fff',
    borderRadius: 4,
  },
  '& .MuiSlider-track': {
    height: 20,
    backgroundColor: color,
  },
  '& .MuiSlider-rail': {
    height: 20,
    backgroundColor: theme.palette.grey[400], 
  },
}));


const UserInput = ({ submitGuess }) => {
  const [value, setValue] = useState(0);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= -maxChange && newValue <= maxChange) {
      setValue(newValue);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitGuess(value);
  };

  // Calculate color based on slider value
  const sliderColor = getColorFromValue(value);

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <TextField
            label="Value"
            variant="outlined"
            value={value.toFixed(2)} // Display value with 2 decimal points
            onChange={handleInputChange}
            inputProps={{ min: -maxChange, max: maxChange, step: 0.01, type: 'number' }}
            sx={{ marginRight: 2, width: '100px' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>

        <HorizontalSlider
          value={value}
          onChange={handleSliderChange}
          min={-maxChange}
          max={maxChange}
          step={0.01} // Set step to 0.01 for finer increments
          aria-labelledby="horizontal-slider"
          color={sliderColor} // Pass the color as a prop
        />
      </Box>
    </form>
  );
};

export default UserInput;
