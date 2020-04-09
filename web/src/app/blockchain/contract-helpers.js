// Frameworks
import React from 'react';
import * as _ from 'lodash';

// App Components
import { Helpers } from '../../utils/helpers';
import { GLOBALS } from '../../utils/globals';
import IPFS from '../../utils/ipfs';

// Contract Data
import {
    getContractByName,
    RentMyTent
} from '../blockchain/contracts';


// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
// https://docs.opensea.io/docs/metadata-standards
const tokenMetadata = {
    'description'       : '',
    'external_url'      : '',
    'animation_url'     : '',
    'youtube_url'       : '',
    'image'             : '',
    'name'              : '',
    'symbol'            : GLOBALS.TOKEN_DATA.SYMBOL,
    'decimals'          : GLOBALS.TOKEN_DATA.DECIMALS,
    'background_color'  : GLOBALS.TOKEN_DATA.BG_COLOR,
    'properties'        : {},
    'attributes'        : [],   // for OpenSea
};

const _contractErrorHandler = (methodName, txDispatch) => (err, txProof) => {
    const msg = _.get(err, 'message', err.toString());
    if (_.isEmpty(txProof) && /denied transaction signature/i.test(msg)) {
        txDispatch({type: 'CLEAR_STREAM'});
        return;
    }

    const errorMsg = [`[${methodName}]`];
    if (/gateway timeout/i.test(msg)) {
        errorMsg.push('Failed to save Image and/or Metadata to IPFS!');
    } else {
        errorMsg.push('An unexpected error has occurred!');
        console.error(err);
    }

    console.info(`[${methodName}] ${msg}`);
    txDispatch({
        type: 'STREAM_ERROR',
        payload: {streamError: errorMsg.join(' ')}
    });
};


const ContractHelpers = {};

ContractHelpers.readContractValue = async (contractName, method, ...args) => {
    const contract = getContractByName(contractName);
    if (!contract) {
        throw new Error(`[ContractHelpers.readContractValue] Invalid Contract Name: ${contractName}`);
    }
    return await contract.instance().callContractFn(method, ...args);
};

ContractHelpers.saveMetadata = ({ tokenData, txDispatch }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Save Image File to IPFS
            txDispatch({
                type: 'STREAM_TRANSITION', payload: {
                    streamTransitions: [{to: 'CREATE', transition: 'IPFS_IMG'}]
                }
            });
            const imageFileUrl = await IPFS.saveImageFile({fileBuffer: tokenData.imageBuffer});
            console.log('imageFileUrl', imageFileUrl);

            // Generate Token Metadata
            const metadata          = {...tokenMetadata};
            metadata.name           = tokenData.name;
            metadata.description    = tokenData.desc;
            metadata.external_url   = `${GLOBALS.BASE_URL}${GLOBALS.APP_ROOT}/tent/{id}`;
            metadata.image          = imageFileUrl;
            // metadata.properties = {};
            // metadata.attributes = [];

            // Save Metadata to IPFS
            txDispatch({
                type: 'STREAM_TRANSITION', payload: {
                    streamTransitions: [{to: 'CREATE', transition: 'IPFS_META'}]
                }
            });
            const jsonFileUrl = await IPFS.saveJsonFile({jsonObj: metadata});
            console.log('jsonFileUrl', jsonFileUrl, metadata);

            resolve({imageFileUrl, jsonFileUrl});
        }
        catch (err) {
            reject(err);
        }
    });
};

ContractHelpers.registerTent = ({from, tokenData, txDispatch}) => {
    return new Promise(async (resolve) => {
        const rentMyTent = RentMyTent.instance();
        const handleError = _contractErrorHandler('registerTent', txDispatch);
        let transactionHash = '';

        try {
            txDispatch({type: 'BEGIN_TX'});
            console.log('ContractHelpers.registerTent');
            console.log(' - tokenData', tokenData);

            // Save Token Metadata
            const {jsonFileUrl} = await ContractHelpers.saveMetadata({tokenData, txDispatch});

            // Update Transition State
            txDispatch({
                type: 'STREAM_TRANSITION', payload: {
                    streamTransitions: [{to: 'CREATE', transition: 'TX_PROMPT'}]
                }
            });

            // Transaction Args
            const tx = {from};
            const weiPrice = Helpers.toWei(tokenData.ethPrice);
            const args = [weiPrice, jsonFileUrl];

            // Submit Transaction and wait for Receipt
            rentMyTent.sendContractTx('listNewTent', tx, args, (err, txHash) => {
                transactionHash = txHash;
                if (err) {
                    handleError(err, transactionHash);
                    return resolve({transactionHash});
                }
                txDispatch({type: 'SUBMIT_TX', payload: {transactionHash}});
                resolve({tx, args, transactionHash});
            });
        }
        catch (err) {
            handleError(err, transactionHash);
            resolve({transactionHash});
        }
    });
};

ContractHelpers.registerMember = ({from, memberName, memberAddress, txDispatch}) => {
    return new Promise(async (resolve) => {
        const rentMyTent = RentMyTent.instance();
        const handleError = _contractErrorHandler('registerMember', txDispatch);
        let transactionHash = '';

        try {
            const ethPrice = GLOBALS.FEES.REGISTER_MEMBER;
            txDispatch({type: 'BEGIN_TX', transactionType: 'REGISTER'});

            // Update Transition State
            txDispatch({
                type: 'STREAM_TRANSITION', payload: {
                    streamTransitions: [{to: 'CREATE', transition: 'TX_PROMPT'}]
                }
            });

            // Transaction Args
            const tx = {from, value: ethPrice};
            const args = [memberAddress, memberName];

            // Submit Transaction and wait for Receipt
            rentMyTent.sendContractTx('registerMember', tx, args, (err, txHash) => {
                transactionHash = txHash;
                if (err) {
                    handleError(err, transactionHash);
                    return resolve({transactionHash});
                }
                txDispatch({type: 'SUBMIT_TX', payload: {transactionHash}});
                resolve({tx, args, transactionHash});
            });
        }
        catch (err) {
            handleError(err, transactionHash);
            resolve({transactionHash});
        }
    });
};

export { ContractHelpers, tokenMetadata };
