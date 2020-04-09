// Frameworks
import React, { useContext } from 'react';
import * as _ from 'lodash';

// Material UI
import Typography from '@material-ui/core/Typography';

// App Components
import SEO from '../../common/seo';
import ListingWizard from '../components/listing/ListingWizard';
import { ContractHelpers } from '../blockchain/contract-helpers';
import { AppTabs } from '../components/AppTabs';
import WarningBox from '../components/WarningBox';

// Data Context for State
import { WalletContext } from '../stores/wallet.store';
import { TransactionContext } from '../stores/transaction.store';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


// List-Tent Route
const ListTent = ({ location }) => {
    const classes = useRootStyles();

    const [, txDispatch ] = useContext(TransactionContext);

    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;

    const handleSubmit = async (formData) => {
        const options = {
            txDispatch,
            from: connectedAddress,
            tokenData: formData,
        };
        await ContractHelpers.registerTent(options);
    };

    const _getContent = () => {
        return (
            <form autoComplete={'off'}>
                <ListingWizard
                    onSubmitForm={handleSubmit}
                />
            </form>
        );
    };

    return (
        <>
            <SEO title={'List My Tent'} />
            <AppTabs location={location} />

            <Typography
                variant={'h5'}
                component={'h3'}
                className={classes.pageHeader}
            >
                List My Tent!
            </Typography>

            {
                !allReady
                    ? <WarningBox message="You must connect your account in order to List Tents!" />
                    : _getContent()
            }
        </>
    )
};

export default ListTent;
