// Frameworks
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

// Material UI
// see https://v3.material-ui.com/style/color/
// see https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=EC407A&secondary.color=8E24AA

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        // type: 'dark',
        background: {
            default: '#f5ead2',
            paper:   '#FCFBF7',
        },
        primary: {
            main: '#ed7a34',
        },
        secondary: {
            main: '#fccf0e',
        },
    },

    // overrides: {
    //     MuiExpansionPanel: createStyles({
    //         root: {
    //             background: 'transparent',
    //             border: '1px solid #444',
    //         }
    //     })
    // }
});
