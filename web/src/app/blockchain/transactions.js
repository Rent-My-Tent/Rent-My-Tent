// Frameworks
import { createDfuseClient } from '@dfuse/client';
import * as _ from 'lodash';

// App Components
import {
    RentMyTent,
} from '../blockchain/contracts';
import { LocalCache } from '../../utils/local-cache';
import { Helpers } from '../../utils/helpers';
import { GLOBALS } from '../../utils/globals';

// Queries
import { streamTransactionQuery } from './queries/StreamTransactionQuery';
import { searchTransactionEvent } from './queries/SearchTransactionEvent';

// Transaction Events
const transactionEventMap = {
    'EVENT_NAME': {
        contract    : RentMyTent,
        eventName   : 'SomeEventName',
        method      : 'SomeEventName(uint256,string,bool,bool,string,uint256,string)',
    },
};

class Transactions {

    constructor() {
        this.apiKey = GLOBALS.DFUSE_API_KEY;
        this.rootDispatch = null;
        this.txDispatch = null;
        this.networkId = 0;
        this.stream = null;
        this.client = null;
        this.activeSearchId = null;
    }

    static instance() {
        if (!Transactions.__instance) {
            Transactions.__instance = new Transactions();
        }
        return Transactions.__instance;
    }

    init({rootDispatch, txDispatch}) {
        this.rootDispatch = rootDispatch;
        this.txDispatch = txDispatch;
    }

    connectToNetwork({networkId}) {
        const networkName = Helpers.getNetworkName(networkId);
        this.networkId = networkId;
        this.client = createDfuseClient({
            apiKey: this.apiKey,
            network: `${networkName}.eth.dfuse.io`,
            streamClientOptions: {
                socketOptions: {
                    onClose: this.onClose,
                    onError: this.onError,
                }
            }
        });
        this.rootDispatch({type: 'CONNECTED_NETWORK', payload: {
            networkId,
            isNetworkConnected: true,
            networkErrors: []
        }});
    }

    resumeIncompleteStreams() {
        const transactionHash = LocalCache.get('streamTxHash');
        if (_.isEmpty(transactionHash)) { return; }

        (async () => {
            await this.streamTransaction({transactionHash});
        })();
    }

    clearSearch() {
        if (!this.txDispatch) { return; }
        this.txDispatch({type: 'CLEAR_SEARCH'});
    }

    cancelSearch() {
        this.activeSearchId = null;
    }

    onClose() {
        this.rootDispatch({type: 'DISCONNECTED_NETWORK', payload: {
            isNetworkConnected: false,
            networkErrors: []
        }});
    }

    onError(error) {
        this.rootDispatch({type: 'DISCONNECTED_NETWORK', payload: {
            isNetworkConnected: false,
            networkErrors: ["Transactions: An error occurred with the socket.", JSON.stringify(error)]
        }});
    }

    async streamTransaction({transactionHash}) {
        if (!this.txDispatch) { return; }
        this.txDispatch({type: 'BEGIN_STREAMING', payload: {transactionHash}});

        let currentTransitions = [];
        let confirmations = 0;
        let count = 0;
        let forceEnd = false;

        LocalCache.set('streamTxHash', transactionHash);

        this.stream = await this.client.graphql(streamTransactionQuery, (message) => {
            if (message.type === 'error') {
                this.txDispatch({type: 'STREAM_ERROR', payload: {
                    streamError: message.errors[0]['message']
                }});
            }

            if (message.type === 'data') {
                const newTransition = {
                    key         : `transition-${count++}`,
                    transition  : message['data']['transactionLifecycle']['transitionName'],
                    from        : message['data']['transactionLifecycle']['previousState'],
                    to          : message['data']['transactionLifecycle']['currentState'],
                    data        : message['data']
                };
                currentTransitions = [...currentTransitions, newTransition];
                confirmations = _.get(newTransition, 'data.transactionLifecycle.transition.confirmations', 0);

                if (confirmations >= GLOBALS.MIN_BLOCK_CONFIRMATIONS) {
                    forceEnd = true;
                } else {
                    this.txDispatch({
                        type: 'STREAM_TRANSITION', payload: {
                            streamTransitions: currentTransitions.reverse()
                        }
                    });
                }
            }

            if (message.type === 'complete' || forceEnd) {
                LocalCache.set('streamTxHash', '');
                this.txDispatch({type: 'STREAM_COMPLETE'});
                this.stream.close();
            }
        },{
            variables: {
                hash:  transactionHash
            }
        });

        await this.stream.join();
    }


}
Transactions.__instance = null;

export default Transactions;
