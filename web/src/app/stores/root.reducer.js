
const RootReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_WALLET_MODAL':
            return {
                ...state,
                showConnectWalletModal: action.payload
            };
        case 'CONNECTION_STATE':
            return {
                ...state,
                connectionState: action.payload
            };
        case 'CONNECTED_NETWORK':
            return {
                ...state,
                networkId          : action.payload.networkId,
                isNetworkConnected : action.payload.isNetworkConnected,
                networkErrors      : action.payload.networkErrors,
            };
        case 'DISCONNECTED_NETWORK':
            return {
                ...state,
                isNetworkConnected : action.payload.isNetworkConnected,
                networkErrors      : action.payload.networkErrors,
            };

        case 'UPDATE_LISTING_DATA':
            return {
                ...state,
                tentListingData : {
                    ...state.tentListingData,
                    ...action.payload
                },
            };
        case 'CLEAR_LISTING_DATA':
            return {
                ...state,
                tentListingData : {},
            };

        case 'UPDATE_REGISTRATION_DATA':
            return {
                ...state,
                registrationData : {
                    ...state.registrationData,
                    ...action.payload
                },
            };
        case 'CLEAR_REGISTRATION_DATA':
            return {
                ...state,
                registrationData : {},
            };

        case 'UPDATE_MEMBER_STATE':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default RootReducer;
