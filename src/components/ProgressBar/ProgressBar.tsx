// @ts-ignore
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

interface ProgressBarProps {
    value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={value} />
        </Box>
    );
};

export default ProgressBar;
