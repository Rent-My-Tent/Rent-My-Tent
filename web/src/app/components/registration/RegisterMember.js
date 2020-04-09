// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import * as _ from 'lodash';

// App Components
import { ContractHelpers } from '../../blockchain/contract-helpers';
import EthSymbol from '../EthSymbol';
import DisplayContractValue from '../DisplayContractValue';
import { Helpers } from '../../../utils/helpers';

// Data Context for State
import { RootContext } from '../../stores/root.store';
import { WalletContext } from '../../stores/wallet.store';
import { TransactionContext } from '../../stores/transaction.store';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import useRootStyles from '../../layout/styles/root.styles';
const useCustomStyles = makeStyles(theme => ({
    fileInputFieldset: {
        width: '85%',
    },
    fileInput: {
        display: 'none',
    },
    fileName: {
        display: 'inline-block',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    fileNameLabel: {
        verticalAlign: 'middle',
    },
    tentImage: {
        maxWidth: '100%',
        maxHeight: 400,
        borderRadius: 5,
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

let _lastKnownConnectedAddress = '';

const RegisterMember = ({ elevation }) => {
    const classes = useRootStyles();
    const customClasses = useCustomStyles();

    const [ rootState, rootDispatch ] = useContext(RootContext);
    const { connectionState, registrationData } = rootState;

    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;

    const [, txDispatch ] = useContext(TransactionContext);

    const [memberName,    setMemberName]    = useState(registrationData.memberName || '');
    const [memberAddress, setMemberAddress] = useState(registrationData.memberAddress || '');

    const [isMemberNameValid,    setMemberNameValid]    = useState(true);
    const [isMemberAddressValid, setMemberAddressValid] = useState(true);
    const [formValidated,        setFormValidated]      = useState(false);

    useEffect(() => {
        const hasEmptyAddress = _.isEmpty(memberAddress);
        const hasPreviousAddress = (_lastKnownConnectedAddress === memberAddress && _lastKnownConnectedAddress !== connectedAddress);
        _lastKnownConnectedAddress = connectedAddress;

        if (allReady && (hasEmptyAddress || hasPreviousAddress)) {
            setMemberAddress(connectedAddress);
            setMemberAddressValid(!_.isEmpty(connectedAddress));
        }
    }, [connectedAddress]);

    useEffect(() => {
        setFormValidated(_validateForm());

        rootDispatch({
            type    : 'UPDATE_REGISTRATION_DATA',
            payload : {
                memberName,
                memberAddress,
            }
        });
    }, [
        connectionState,
        memberName,
        memberAddress,
    ]);

    const _validateAll = () => {
        setMemberNameValid(!_.isEmpty(memberName));
        setMemberAddressValid(!_.isEmpty(memberAddress));
    };

    const _validateForm = () => {
        const conditions = [
            _.isEmpty(connectionState),
            !_.isEmpty(memberName),
            !_.isEmpty(memberAddress),
        ];
        return _.every(conditions, Boolean);
    };

    const _updateMemberName = evt => {
        const value = evt.target.value;
        setMemberName(value);
        setMemberNameValid(!_.isEmpty(value));
    };

    const _updateMemberAddress = evt => {
        const value = _.trim(evt.target.value);
        setMemberAddress(value);
        setMemberAddressValid(!_.isEmpty(value));
    };

    const _handleSubmit = async evt => {
        evt.preventDefault();
        if (!formValidated) {
            return _validateAll();
        }

        const options = {
            from: connectedAddress,
            memberName,
            memberAddress,
            txDispatch,
        };
        await ContractHelpers.registerMember(options);
    };

    return (
        <Paper square elevation={elevation} className={customClasses.resetContainer}>
            <Box pb={2}>
                <Typography variant={'h5'}>
                    Register!
                </Typography>
            </Box>
            <Box py={3}>
                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={6}>
                        <TextField
                            id="memberName"
                            label="Your Name"
                            variant="outlined"
                            onChange={_updateMemberName}
                            value={memberName}
                            fullWidth
                            required
                            error={!isMemberNameValid}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="memberAddress"
                            label="Ethereum Address"
                            variant="outlined"
                            onChange={_updateMemberAddress}
                            value={memberAddress}
                            fullWidth
                            required
                            error={!isMemberAddressValid}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            <Box pt={2}>
                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12} sm={6}>
                        <Box py={2}>
                            <Typography component={'span'} variant={'body1'}>
                                Membership Fee: &nbsp;
                            </Typography>
                            <EthSymbol />
                            <DisplayContractValue
                                contractName="RentMyTent"
                                method="getMembershipFee"
                                methodArgs={[]}
                                formatValue={Helpers.toEther}
                                defaultValue={''}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            className={classes.gridRow}
                            style={{textAlign:'right'}}
                        >
                            <Button
                                type="button"
                                // disabled={!formValidated}
                                variant={formValidated ? 'contained' : 'outlined'}
                                color={formValidated ? 'primary' : 'default'}
                                size="large"
                                onClick={_handleSubmit}
                                className={formValidated ? '' : customClasses.visiblyDisabledButton}
                            >
                                Register!
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default RegisterMember;
