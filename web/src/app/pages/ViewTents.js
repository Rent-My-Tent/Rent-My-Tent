// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import UseAnimations from 'react-useanimations';
import * as _ from 'lodash';

// Material UI
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';

// App Components
import SEO from '../../common/seo';
import { AppTabs } from '../components/AppTabs';

// Data Context for State
import { WalletContext } from '../stores/wallet.store';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


// Main Route
const ViewTents = ({ location }) => {
    const classes = useRootStyles();

    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;


    const _getContent = () => {
        if (!allReady) {
            return (
                <Alert
                    variant="outlined"
                    severity="warning"
                    icon={<UseAnimations animationKey="alertTriangle" size={24} />}
                >
                    You must connect your account in order to Rent Tents!
                </Alert>
            );
        }

        return (
            <Typography variant={'body1'} component={'p'}>
                Address: {connectedAddress}
            </Typography>
        );
    };

    return (
        <>
            <SEO title={'Rent a Tent'} />
            <AppTabs location={location} />

            <Typography
                variant={'h5'}
                component={'h3'}
                className={classes.pageHeader}
            >
                Rent a Tent!
            </Typography>

            {_getContent()}
        </>
    )
};

export default ViewTents;
