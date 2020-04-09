import React, { createContext, useReducer } from 'react';
import TransactionReducer from './transaction.reducer'


const initialState = {
    submittedTransaction: {},

    transactionHash: '',
    streamState: '',
    streamError: '',
    streamTransitions: [],

    searchState: '',
    searchError: '',
    searchTransactions: [],
};

const TransactionStore = ({children}) => {
    const [state, dispatch] = useReducer(TransactionReducer, initialState);
    return (
        <TransactionContext.Provider value={[state, dispatch]}>
            {children}
        </TransactionContext.Provider>
    )
};

export const TransactionContext = createContext(initialState);
export default TransactionStore;
