// Frameworks
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Link from '@material-ui/core/Link';


const Header = ({siteTitle, onRedirect}) => (
    <header
        style={{
            background: `black`,
            marginBottom: `1.45rem`,
        }}
    >
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            <h1 style={{margin: 0}}>
                <Link
                    href="#"
                    onClick={onRedirect()}
                    style={{
                        color: `white`,
                        textDecoration: `none`,
                    }}
                >
                    {siteTitle}
                </Link>
            </h1>
        </div>
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string.isRequired,
    onRedirect: PropTypes.func.isRequired,
};

export default Header;
