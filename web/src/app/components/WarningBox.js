// Frameworks
import React from 'react';
import UseAnimations from 'react-useanimations';

// Material UI
import Alert from '@material-ui/lab/Alert';

const WarningBox = ({ message }) => (
    <Alert
        variant="outlined"
        severity="warning"
        icon={<UseAnimations animationKey="alertTriangle" size={24} />}
    >
        {message}
    </Alert>
);

export default WarningBox;
