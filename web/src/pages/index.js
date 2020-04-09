// Frameworks
import React from 'react';
import { navigate } from 'gatsby';
import clsx from 'clsx';
import * as _ from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Layout Components
import Layout from '../layout/layout';
import SEO from '../common/seo';
import HeroHeader from '../common/HeroHeader'
import HeroFooter from '../common/HeroFooter'
import { GLOBALS } from '../utils/globals';

// Custom Theme
import useLandingStyles from '../layout/styles/landing.styles';

const StyledButton = withStyles(theme => {
    const gradient = `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`;
    return {
        root: {
            height: 60,
            padding: '0 30px',
            background: gradient,
            borderRadius: 7,
            border: 0,
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '100',

            [theme.breakpoints.down('sm')]: {
                fontSize: '1.15rem',
                padding: '0 20px',
            },
        },
        label: {
            textTransform: 'capitalize',
        },
    };
})(Button);


// Static Route
const IndexPage = () => {
    const classes = useLandingStyles();

    const _gotoApp = (evt) => {
        evt.preventDefault();
        navigate(`${GLOBALS.APP_ROOT}`);
    };

    const _getHeroHeader = ({siteTitle, onHomeClick}) => {
        return (<HeroHeader siteTitle={siteTitle} onHomeClick={onHomeClick} />);
    };

    const _getHeroFooter = () => {
        return (<HeroFooter />);
    };

    return (
        <Layout
            header={_getHeroHeader}
            footer={_getHeroFooter}
        >
            <SEO />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                className={classes.heroContainer}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                >
                    <Grid item xs={12} sm={6}>
                        <Box px={5}>
                            <Typography variant="h3" className={classes.heading1}>
                                Sell your tent.
                            </Typography>
                            <Typography variant="h3" className={classes.heading2}>
                                Hire a tent.
                            </Typography>
                            <Typography variant="h5" className={classes.heading3}>
                                A rental marketplace for used tents.
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box px={5}>
                            <StyledButton size="large" as="a" href="#" onClick={_gotoApp}>List a Tent</StyledButton>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

        </Layout>
    );
};

export default IndexPage;
