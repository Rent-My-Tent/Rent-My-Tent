// Frameworks
import React, { useContext, useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ToastContainer } from 'react-toastify';
import * as _ from 'lodash';

// Material UI
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

// Custom Styles
import './styles/overrides.css';
import theme from '../../layout/styles/root.theme';
import useRootStyles from './styles/root.styles';

// Toast Styles
import 'react-toastify/dist/ReactToastify.css';

// App Components
import Wallet from '../wallets';
import { Helpers } from '../../utils/helpers';
import { GLOBALS } from '../../utils/globals';
import { HeaderBar } from '../components/HeaderBar';
import { Sidemenu } from '../components/Sidemenu';
import { ConnectionWarning } from '../components/ConnectionWarning';
import { ConnectWallet } from '../components/ConnectWallet';

// Contract Data
import { RentMyTent } from '../blockchain/contracts';
import RentMyTentData from '../blockchain/contracts/RentMyTent';

// Transactions Monitor
import Transactions from '../blockchain/transactions';
import TransactionManager from '../blockchain/TransactionManager';

// Data Context for State
import { RootContext } from '../stores/root.store';
import { WalletContext } from '../stores/wallet.store';
import { TransactionContext } from '../stores/transaction.store';


function AppLayout({ children }) {
    const classes = useRootStyles();
    const wallet = Wallet.instance();
    const [, rootDispatch ] = useContext(RootContext);
    const [, txDispatch ] = useContext(TransactionContext);
    const [ walletState, walletDispatch ] = useContext(WalletContext);
    const { allReady: isWalletReady, networkId } = walletState;
    const [ mobileOpen, setMobileOpen ] = useState(false);

    const data = useStaticQuery(graphql`
        query SiteDataQuery {
            site {
                siteMetadata {
                    title
                    logoUrl
                }
            }
        }
    `);
    const siteTitle = data.site.siteMetadata.title;
    const siteLogoUrl = data.site.siteMetadata.logoUrl;

    const correctNetwork = _.parseInt(GLOBALS.CHAIN_ID, 10);
    const correctNetworkName = _.upperFirst(Helpers.getNetworkName(correctNetwork));

    // Prepare Wallet Interface
    useEffect(() => {
        wallet.init({walletDispatch, siteTitle, siteLogoUrl});
    }, [wallet, walletDispatch]);

    // Reconnect to Contracts on network change
    useEffect(() => {
        if (isWalletReady) {
            const web3 = wallet.getWeb3();

            const rentMyTentAddress = _.get(RentMyTentData.networks[networkId], 'address', '');

            RentMyTent.prepare({web3, address: rentMyTentAddress});
            RentMyTent.instance();

            const transactions = Transactions.instance();
            transactions.init({rootDispatch, txDispatch});
            transactions.connectToNetwork({networkId});
            transactions.resumeIncompleteStreams();
        }
    }, [isWalletReady, networkId, wallet]);

    useEffect(() => {
        const isModernWeb3 = !!window.ethereum;
        const isLegacyWeb3 = (typeof window.web3 !== 'undefined');

        if (!isLegacyWeb3 && !isModernWeb3) {
            rootDispatch({type: 'CONNECTION_STATE', payload: {type: 'NON_WEB3', message: 'Not a Web3 capable browser'}});
        } else if (_.isUndefined(networkId) || networkId === 0) {
            rootDispatch({type: 'CONNECTION_STATE', payload: {type: 'WEB3_DISCONNECTED', message: 'Please connect your Web3 Wallet'}});
        } else if (networkId !== correctNetwork) {
            rootDispatch({type: 'CONNECTION_STATE', payload: {type: 'WEB3_WRONG_NETWORK', message: `Wrong Ethereum network, please connect to ${correctNetworkName}.`}});
        } else {
            rootDispatch({type: 'CONNECTION_STATE', payload: {}}); // Web3, Connected, Correct Network
        }
    }, [networkId, rootDispatch]);

    const _handleDrawerToggle = (evt) => {
        evt.preventDefault();
        setMobileOpen(!mobileOpen);
    };

    const _handleCloseDrawer = () => {
        setMobileOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <HeaderBar
                    title={siteTitle}
                    drawerToggle={_handleDrawerToggle}
                />
                <Hidden mdUp implementation="css">
                    <nav className={classes.drawer} aria-label="mailbox folders">
                        <Drawer
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={_handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <Sidemenu title={siteTitle} closeDrawer={_handleCloseDrawer} />
                        </Drawer>
                    </nav>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <div className={classes.tabBar}>
                        <Container maxWidth="md">
                            <ConnectionWarning />
                            {children}
                        </Container>
                    </div>

                    <ConnectWallet />
                    <TransactionManager />
                </main>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        </ThemeProvider>
    );
}

export default AppLayout;
