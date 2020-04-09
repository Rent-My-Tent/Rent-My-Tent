// Frameworks
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => {
    return {
        primaryContainer: {
            background: 'linear-gradient(45deg, #F4BE96 30%, #F5EAD2 90%)',
        },

        heroContainer: {
            height: '70vh',
        },
        heroHeader: {
            height: '15vh',
            margin: '0',
            padding: '5px 10px',
        },
        heroFooter: {
            height: '15vh',
            margin: '0',
        },

        heroLogo: {
            display: 'inline-block',
            width: 140,
            padding: 10,
            color: '#212054',
            textDecoration: 'none',

            '& span': {
                display: 'block',
                marginTop: -10,
                textAlign: 'center',
                fontSize: '0.8em',
                textTransform: 'uppercase',
            },
        },
        heroLogoImg: {
            margin: '0 10px',
        },

        heroMenu: {
            paddingRight: 50,
        },
        heroMenuLink: {
            padding: '0 20px',
        },

        heading1: {

        },
        heading2: {

        },
        heading3: {

        },

        centerAlign: {
            textAlign: 'center',
        },

    };
});
