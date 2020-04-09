// Frameworks
import fetch from 'node-fetch';
import * as _ from 'lodash';

// App Components
import Wallet from '../app/wallets';
import RentMyTentData from '../app/blockchain/contracts/RentMyTent';

// Common
import { GLOBALS } from './globals';

export const Helpers = {};

Helpers.now = () => {
    return (new Date()).getTime();
};

Helpers.sleep = (delay = 0) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
};

Helpers.getBlockieOptions = (walletData, opts = {}) => {
    const defaultOptions = {
        size        : 15,
        scale       : 2,
        seed        : walletData.connectedAddress,
        color       : `#${walletData.connectedAddress.slice(2, 8)}`,
        bgcolor     : `#${walletData.connectedAddress.slice(12, 18)}`,
        spotcolor   : `#${walletData.connectedAddress.slice(22, 28)}`,
    };
    return {...defaultOptions, ...opts};
};

Helpers.getShortAddress = (address) => {
    return _.join([..._.slice(address, 0, 6), '...', ..._.slice(address, -4)], '');
};

Helpers.getNetworkName = (networkId) => {
    switch (_.parseInt(networkId, 10)) {
        case 1:
            return 'mainnet';
        case 3:
            return 'ropsten';
        case 42:
            return 'kovan';
        default:
            return 'development';
    }
};

Helpers.getSampleName = async () => {
    const response = await fetch('https://frightanic.com/goodies_content/docker-names.php');
    return _.startCase(await response.text());
};

Helpers.getEtherPrice = async () => {
    const response = await fetch(GLOBALS.ETH_PRICE.API);
    const json = await response.json();
    return _.get(_.first(json), 'current_price', 0);
};

Helpers.getUsdToEth = async (amountUSD) => {
    let ethPrice = _.get(Helpers, '__USD2ETH_PRICE', 0);
    const lastLookupTime = _.get(Helpers, '__USD2ETH_CACHE', 0);
    if (ethPrice === 0 || GLOBALS.ETH_PRICE.CACHE_TIME > Helpers.now() - lastLookupTime) {
        ethPrice = await Helpers.getEtherPrice();
    }
    return _.round(amountUSD * (1 / ethPrice), GLOBALS.ETH_PRICE.PRECISION);
};

Helpers.toEther = (value) => {
    // if (!_.isString(value)) {
    //     value = value.toLocaleString('fullwide', {useGrouping: false});
    // }
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return value; }
    return web3.utils.fromWei(value, 'ether');
};

Helpers.toEtherWithLocale = (value, precision = 0) => {
    if (_.indexOf(value, ',') > -1) { return value; }
    return parseFloat(Helpers.toEther(value)).toLocaleString(void(0), {minimumFractionDigits: precision, maximumFractionDigits: precision});
};
Helpers.toEtherWithLocalePrecise = (precision) => (value) => Helpers.toEtherWithLocale(value, precision);


Helpers.toWei = (value) => {
    return `${(parseFloat(value) * GLOBALS.ETH_UNIT)}`;
};

Helpers.toAscii = (str) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return str; }
    return web3.utils.hexToAscii(str);
};

Helpers.toBytes16 = (str) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return str; }
    return web3.utils.utf8ToHex(str);
};

Helpers.keccak = ({type, value}) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return value; }
    return web3.utils.soliditySha3({type, value});
};

Helpers.keccakStr = (str) => {
    return Helpers.keccak({type: 'string', value: str});
};

Helpers.decodeLog = ({eventName, logEntry}) => {
    const web3 = Wallet.instance().getWeb3();
    if (!web3) { return null; }
    const eventData = _.find(RentMyTentData.abi, {type: 'event', name: eventName});
    const eventAbi = _.get(eventData, 'inputs', []);
    if (_.isEmpty(eventAbi)) { return false; }
    return web3.eth.abi.decodeLog(eventAbi, logEntry.data, logEntry.topics.slice(1));
};
