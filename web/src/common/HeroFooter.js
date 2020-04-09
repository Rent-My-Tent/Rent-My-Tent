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
            <Box px={5}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Typography>
                        &copy; {new Date().getFullYear()}, Rent My Tent
                    </Typography>
                </Grid>
            </Box>
        </footer>
    );
};

export default HeroFooter;
