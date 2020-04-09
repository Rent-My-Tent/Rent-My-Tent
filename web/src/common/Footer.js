// Frameworks
import React from 'react';

// Material UI
import Box from '@material-ui/core/Box';


const Footer = () => (
    <footer>
        <Box mt={4}>
            &copy; {new Date().getFullYear()}, Rent My Tent
        </Box>
    </footer>
);

export default Footer;
