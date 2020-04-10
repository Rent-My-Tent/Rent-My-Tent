// Frameworks
import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// Material UI
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

// Custom Theme
import useLandingStyles from '../layout/styles/landing.styles';


const HeroHeader = ({siteTitle, onRedirect}) => {
    const classes = useLandingStyles();
    const preventDefault = (event) => event.preventDefault();

    const logoData = useStaticQuery(graphql`
        query {
          tentLogo: file(relativePath: { eq: "logo/RentMyTent@1x.png" }) {
            childImageSharp {
              fixed(width: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
    `);

    return (
        <header className={classes.heroHeader}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <a href={'#'} onClick={onRedirect()} className={classes.heroLogo}>
                    <Img fixed={logoData.tentLogo.childImageSharp.fixed} className={classes.heroLogoImg} />
                    <span>{siteTitle}</span>
                </a>

                <div className={classes.heroMenu}>
                    <Link href="#" className={classes.heroMenuLink} onClick={preventDefault}>
                        About
                    </Link>

                    <Link href="#" className={classes.heroMenuLink} onClick={preventDefault}>
                        How it works
                    </Link>

                    <Link href="#" className={classes.heroMenuLink} onClick={onRedirect('list')}>
                        Get Started
                    </Link>
                </div>
            </Grid>
        </header>
    );
};

HeroHeader.propTypes = {
    siteTitle: PropTypes.string.isRequired,
    onRedirect: PropTypes.func.isRequired,
};

export default HeroHeader;
