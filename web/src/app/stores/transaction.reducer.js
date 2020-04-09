
const TransactionReducer = (state, action) => {
    switch (action.type) {
        case 'BEGIN_TX':
            return {
                ...state,
                submittedTransaction: {},
                transactionType: action.transactionType,
                transactionHash: '',
                streamState: 'started',
                streamError: '',
                streamTransitions: [],
            };
        case 'SUBMIT_TX':
            return {
                ...state,
                submittedTransaction: action.payload,
                streamState: 'submitted',
            };
        case 'BEGIN_STREAMING':
            return {
                ...state,
                submittedTransaction: {},
                transactionHash: action.payload.transactionHash,
                streamState: 'streaming',
            };
        case 'STREAM_ERROR':
            return {
                ...state,
                streamState: 'completed',
                streamError: action.payload.streamError,
            };
        case 'STREAM_TRANSITION':
            return {
                ...state,
                streamTransitions: action.payload.streamTransitions,
            };
        case 'STREAM_COMPLETE':
            return {
                ...state,
                transactionHash: '',
                streamState: 'completed',
                streamTransitions: [],
            };
        case 'CLEAR_STREAM':
            return {
                ...state,
                submittedTransaction: {},
                transactionType: '',
                transactionHash: '',
                streamState: '',
                streamError: '',
                streamTransitions: [],
            };

        case 'BEGIN_SEARCH':
            return {
                ...state,
                searchState: 'searching',
                searchTransactions: [],
                searchError: '',
            };
        case 'SEARCH_ERROR':
            return {
                ...state,
                searchState: 'complete',
                searchError: action.payload.searchError
            };
        case 'SEARCH_COMPLETE':
            return {
                ...state,
                searchState: 'complete',
                searchTransactions: action.payload.searchTransactions
            };

        case 'CLEAR_SEARCH':
            return {
                ...state,
                searchState: '',
                searchTransactions: [],
                searchError: '',
            };
        default:
            return state;
    }
};

export default TransactionReducer;
