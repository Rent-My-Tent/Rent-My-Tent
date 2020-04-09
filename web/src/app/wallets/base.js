// Frameworks
import * as _ from 'lodash';

// App Components
import { ContractHelpers } from '../blockchain/contract-helpers';
import { Helpers } from '../../utils/helpers';

class IWalletBase {
    constructor(type, siteTitle, siteLogoUrl, dispatch) {
        this.type = type;
        this.siteTitle = siteTitle;
        this.siteLogoUrl = siteLogoUrl;
        this.dispatchState = dispatch;

        this.web3 = null;
        this.provider = null;
    }

    static isEnabled() {
        return true;
    }

    async prepare() {
        // Get Default Account if already Connected
        await this.changeUserAccount();
        this._hookCommonEvents();
    }

    async connect() {
        return await this.changeUserAccount();
    }

    async reconnect() {
        return await this.changeUserAccount();
    }

    async disconnect() {
        this.dispatchState({type: 'LOGOUT'});
    }

    async changeUserAccount(accounts) {
        const payload = {
            networkId   : 0,
            type        : '',
            name        : '',
            address     : '',
            balance     : 0,
        };
        this.dispatchState({type: 'ALL_READY', payload: false});
        this.dispatchState({type: 'CONNECTED_ACCOUNT', payload});

        if (_.isEmpty(accounts)) {
            accounts = await this.web3.eth.getAccounts();
        }
        if (_.isEmpty(accounts)) {
            console.error('Failed to connect to accounts for wallet!');
            return;
        }

        const address = _.first(accounts) || '';

        // console.log('>>>>>  this.web3.eth', await this.web3.eth);
        // console.log('>>>>>  this.provider', this.provider);
        // console.log('>>>>>  getChainId', await this.web3.eth.getChainId());
        // console.log('>>>>>  accounts', accounts);
        // console.log('>>>>>  address', address);
        // console.log('>>>>>  coinbase', await this.web3.eth.getCoinbase());

        payload.networkId = await this.web3.eth.getChainId(); // this.provider.networkVersion;
        payload.type = this.type;
        payload.address = address;
        payload.name = Helpers.getShortAddress(address);
        payload.balance = await this.web3.eth.getBalance(address);

        this.dispatchState({type: 'CONNECTED_ACCOUNT', payload});

        setTimeout(() => {
            this.dispatchState({type: 'ALL_READY', payload: true});
        }, 1);

        return payload;
    }

    getChainName(chainId) {
        return Helpers.getNetworkName(chainId);
    }

    _hookCommonEvents() {
        const _changeAccount = async () => {
            await this.changeUserAccount();
        };
        if (_.isFunction(this.provider.on)) {
            this.provider.on('accountsChanged', _changeAccount);
            this.provider.on('networkChanged', _changeAccount);
        }
    }
}

export default IWalletBase;
