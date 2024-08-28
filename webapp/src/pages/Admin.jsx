import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import GenerateStock from '../components/GenerateStock';

const Admin = () => {
  
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Typography variant="h4" gutterBottom>
                Admin Page
            </Typography>

            <GenerateStock />
        </Box>
    );
};

export default Admin;
