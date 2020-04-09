// Frameworks
import React, { useContext } from 'react';
import * as _ from 'lodash';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

// Rimble UI
import { Blockie } from 'rimble-ui';

// App Components
import { Helpers } from '../../utils/helpers';

// Data Context for State
import { RootContext } from '../stores/root.store';
import { WalletContext } from '../stores/wallet.store';


// Custom Styles
const useCustomStyles = makeStyles(theme => ({
    walletButton: {
        marginLeft: 'auto',
        color: theme.palette.grey[700],
        textTransform: 'none',
    },
    rounded: {
        width: '32px',
        height: '32px',
        marginLeft: '10px',
        border: '1px solid #999',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    progress: {
        background: theme.palette.grey[400],
    },
    progressCircle: {
        marginTop: '6px',
    },
}));


let _lastConnectedAddress = '';

function WalletButton() {
    const customClasses = useCustomStyles();
    const [, rootDispatch ] = useContext(RootContext);
    const [walletState] = useContext(WalletContext);

    const _connectWallet = async () => {
        rootDispatch({type: 'SHOW_WALLET_MODAL', payload: true});
    };

    //
    // Not Logged In - Connect Wallet Button
    //
    if (_.isEmpty(_lastConnectedAddress) && _.isEmpty(walletState.connectedAddress)) {
        return (
            <Button
                className={customClasses.walletButton}
                aria-label="Connect Wallet"
                onClick={_connectWallet}
            >
                Login&nbsp;
                <AccountBoxIcon />
            </Button>
        );
    }
    _lastConnectedAddress = walletState.connectedAddress;

    //
    // Logged In - Wallet Button
    //
    const _getBlockie = () => {
        const blockieOptions = Helpers.getBlockieOptions(walletState);
        let blockie = (<div className={customClasses.progress}>
            <CircularProgress
                color="primary"
                variant="indeterminate"
                className={customClasses.progressCircle}
                size={18}
            />
        </div>);
        if (!_.isEmpty(walletState.connectedAddress)) {
            blockie = (<Blockie opts={blockieOptions} />);
        }
        return blockie;
    };

    return (
        <Button
            className={customClasses.walletButton}
            aria-label="Connect Wallet"
            onClick={_connectWallet}
        >
            <Hidden xsDown implementation="css">
                {walletState.connectedName}
            </Hidden>
            <div className={customClasses.rounded}>
                {_getBlockie()}
            </div>
        </Button>
    );
}

export { WalletButton };
