import React, { useState } from 'react';
import { Slider, Box, Typography } from '@mui/material';
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
  height: '300px', // Adjust the height as needed
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Calculate color based on slider value
  const sliderColor = getColorFromValue(value);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '400px', justifyContent: 'center' }}>
      <Typography gutterBottom>Value: {value}</Typography>
      <VerticalSlider
        orientation="vertical"
        value={value}
        onChange={handleChange}
        min={-100}
        max={100}
        aria-labelledby="vertical-slider"
        color={sliderColor} // Pass the color as a prop
      />
    </Box>
  );
};

export default UserInput;


// import React, { useState } from 'react';
// import { Slider, Box, Typography } from '@mui/material';
// import { styled } from '@mui/system';

// // Function to calculate color based on value
// const getColorFromValue = (value) => {
//   const normalizedValue = (value + 100) / 200; // Normalize value to range [0, 1]
//   const red = Math.min(255, Math.max(0, Math.round((1 - normalizedValue) * 255)));
//   const green = Math.min(255, Math.max(0, Math.round(normalizedValue * 255)));
//   return `rgb(${red}, ${green}, 0)`;
// };

// // Custom styled Box for vertical slider
// const VerticalSlider = styled(Slider)(({ theme }) => ({
//   height: '300px', // Adjust the height as needed
//   '& .MuiSlider-thumb': {
//     width: 24,
//     height: 24,
//     '&:nth-of-type(2)': { // Specifically target the second thumb (user adjustable)
//       backgroundColor: theme.palette.primary.main,
//     },
//     '&:nth-of-type(1)': { // Specifically target the first thumb (locked at 0)
//       width: 0,
//       height: 0,
//       backgroundColor: 'transparent',
//       boxShadow: 'none',
//     },
//   },
//   '& .MuiSlider-track': {
//     height: 4,
//   },
//   '& .MuiSlider-rail': {
//     height: 4,
//   },
// }));

// const UserInput = () => {
//   const [value, setValue] = useState([0, 0]);

//   const handleChange = (event, newValue) => {
//     setValue([0, newValue[1]]);
//   };

//   // Calculate color based on slider value
//   const sliderColor = getColorFromValue(value[1]);

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '400px', justifyContent: 'center' }}>
//       <Typography gutterBottom>Value: {value[1]}</Typography>
//       <VerticalSlider
//         orientation="vertical"
//         value={value}
//         onChange={handleChange}
//         min={-100}
//         max={100}
//         aria-labelledby="vertical-slider"
//         track="inverted"
//         sx={{
//           '& .MuiSlider-track': {
//             backgroundColor: sliderColor,
//           },
//         }}
//       />
//     </Box>
//   );
// };

// export default UserInput;
