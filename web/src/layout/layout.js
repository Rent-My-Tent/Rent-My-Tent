// Frameworks
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import * as _ from 'lodash';

import './styles/reset.css';
import './styles/overrides.css';
import theme from './styles/root.theme';

// Layout Components
import Header from '../common/Header';
import Footer from '../common/Footer';

// Common
import { GLOBALS } from '../utils/globals';

// Custom Theme
import useLandingStyles from '../layout/styles/landing.styles';


// Layout Wrapper
const Layout = ({children, header, footer}) => {
    const classes = useLandingStyles();
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    const _appRedirect = (route = '') => (evt) => {
        evt.preventDefault();
        navigate(`${GLOBALS.APP_ROOT}/${route}`)
    };

    if (_.isFunction(header)) {
        header = header({siteTitle: data.site.siteMetadata.title, onRedirect: _appRedirect});
    } else {
        header = (<Header siteTitle={data.site.siteMetadata.title} onRedirect={_appRedirect}/>);
    }

    if (_.isFunction(footer)) {
        footer = footer();
    } else {
        footer = (<Footer />);
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.primaryContainer}>
                {header}
                <main className={classes.primaryContent}>
                    {children}
                </main>
                {footer}
            </div>
        </ThemeProvider>
    );
};

Layout.propTypes = {
    children: PropTypes.array.isRequired,
    noHeader: PropTypes.bool,
};

Layout.defaultProps = {
    noHeader: false,
};

export default Layout;
