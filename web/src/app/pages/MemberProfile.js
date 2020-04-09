// Frameworks
import React, { useState, useContext } from 'react';
import UseAnimations from 'react-useanimations';
import * as _ from 'lodash';

// Material UI
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// App Components
import SEO from '../../common/seo';
import { AppTabs } from '../components/AppTabs';
import RegisterMember from '../components/registration/RegisterMember';

// Data Context for State
import { RootContext } from '../stores/root.store';
import { WalletContext } from '../stores/wallet.store';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


// Member Route
const MemberProfile = ({ location }) => {
    const classes = useRootStyles();

    const [ rootState ] = useContext(RootContext);
    const { isMember, memberName } = rootState;

    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;

    const _getNonMemberSection = () => {
        return (
            <RegisterMember elevation={2} />
        );
    };

    const _getMemberSection = () => {
        return (
            <Paper square elevation={2}>
                <Box p={3}>
                    <Typography variant={'body1'} component={'p'}>
                        Hello {memberName}!
                    </Typography>

                    <p>TODO:</p>
                    <ul>
                        <li>List Status of Tents in Custody</li>
                        <li>List Profits made from Tents</li>
                    </ul>
                </Box>
            </Paper>
        );
    };

    const _getContent = () => {
        if (!allReady) {
            return (
                <Alert
                    variant="outlined"
                    severity="warning"
                    icon={<UseAnimations animationKey="alertTriangle" size={24} />}
                >
                    You must connect your account in order to view your profile!
                </Alert>
            );
        }

        return isMember
            ? _getMemberSection()
            : _getNonMemberSection();
    };

    return (
        <>
            <SEO title={'Profile'} />
            <AppTabs location={location} />

            <Typography
                variant={'h5'}
                component={'h3'}
                className={classes.pageHeader}
            >
                Your Profile
            </Typography>

            {_getContent()}
        </>
    )
};

export default MemberProfile;
