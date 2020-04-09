// Frameworks
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useCustomStyles = makeStyles(theme => ({
    ethSymbol: {
        margin: '0 0.2rem',
    },
}));

const EthSymbol = () => {
    const customClasses = useCustomStyles();
    return (
        <Typography component={'span'} variant={'body1'} className={customClasses.ethSymbol}>
            &Xi;
        </Typography>
    );
};

export default EthSymbol;
