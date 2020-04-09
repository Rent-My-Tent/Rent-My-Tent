// Frameworks
import React, { useEffect, useContext } from 'react';
import * as _ from 'lodash';

// App Components
import Wallet from '../wallets';
import Transactions from '../blockchain/transactions';
import TxStreamView from '../components/TxStreamView';

// Data Context for State
import { TransactionContext } from '../stores/transaction.store';


const TransactionManager = ({  }) => {
    const wallet = Wallet.instance();
    const [ txState, txDispatch] = useContext(TransactionContext);
    const { transactionType, submittedTransaction, streamState } = txState;

    useEffect(() => {
        if (!_.isEmpty(submittedTransaction)) {
            // dFuse - watch transaction
            const { transactionHash } = submittedTransaction;
            (async () => {
                const transactions = Transactions.instance();
                await transactions.streamTransaction({transactionHash});
            })();

            txDispatch({
                type: 'STREAM_TRANSITION', payload: {
                    streamTransitions: [{to: 'CREATE', transition: 'TX_INIT'}]
                }
            });
        }
    }, [submittedTransaction]);

    // Reconnect after Registration
    useEffect(() => {
        if (transactionType === 'REGISTER' && streamState === 'completed') {
            wallet.reconnect();
        }
    }, [wallet, streamState, transactionType]);

    return (
        <TxStreamView />
    )
};

export default TransactionManager;
