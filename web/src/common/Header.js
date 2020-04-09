// Frameworks
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';


const Header = ({siteTitle, onHomeClick}) => (
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
                    to="/"
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
    onHomeClick: PropTypes.func.isRequired,
};

export default Header;
