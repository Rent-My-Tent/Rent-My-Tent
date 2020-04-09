// Frameworks
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

// App Components
import { AppTitleLink } from './AppTitleLink';
import { WalletButton } from './WalletButton';
import DisplayContractValue from './DisplayContractValue';

// Data Context for State
import { RootContext } from '../stores/root.store';
import { WalletContext } from '../stores/wallet.store';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


const HeaderBar = ({ title, drawerToggle }) => {
    const rootClasses = useRootStyles();

    const [, rootDispatch ] = useContext(RootContext);
    const [ walletState ] = useContext(WalletContext);
    const { connectedAddress } = walletState;

    const _updateMemberState = ({ raw }) => {
        rootDispatch({type: 'UPDATE_MEMBER_STATE', payload: {isMember: raw}});
    };

    const _updateMemberName = ({ raw }) => {
        rootDispatch({type: 'UPDATE_MEMBER_STATE', payload: {memberName: raw}});
    };

    return (
        <AppBar position="fixed" className={rootClasses.appBar}>
            <Toolbar>
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        href="#"
                        onClick={drawerToggle}
                        className={rootClasses.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>

                <AppTitleLink title={title} />

                {
                    !_.isEmpty(connectedAddress) && (
                        <>
                            <DisplayContractValue
                                contractName="RentMyTent"
                                method="isMember"
                                methodArgs={[connectedAddress]}
                                onValue={_updateMemberState}
                                formatValue={() => ''}
                                defaultValue={''}
                            />
                            <DisplayContractValue
                                contractName="RentMyTent"
                                method="getMemberName"
                                methodArgs={[connectedAddress]}
                                onValue={_updateMemberName}
                                formatValue={() => ''}
                                defaultValue={''}
                            />
                        </>
                    )
                }
                <WalletButton />
            </Toolbar>
        </AppBar>
    );
};

HeaderBar.propTypes = {
    title: PropTypes.string.isRequired,
    drawerToggle: PropTypes.func.isRequired,
};

export { HeaderBar };
