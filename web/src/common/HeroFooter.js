// Frameworks
import React from 'react';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom Theme
import useLandingStyles from '../layout/styles/landing.styles';


const HeroFooter = () => {
    const classes = useLandingStyles();
    return (
        <footer className={classes.heroFooter}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
            >
                <Box pt={7}>
                    <Typography variant={'body2'}>
                        &copy; {new Date().getFullYear()}, Rent My Tent
                    </Typography>
                </Box>
            </Grid>
        </footer>
    );
};

export default HeroFooter;
