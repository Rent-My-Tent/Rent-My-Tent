// App Components
import { ContractFactory } from './contract-factory';

// Contract Data
import RentMyTentData from './contracts/RentMyTent';

const RentMyTent = ContractFactory.create({name: RentMyTentData.contractName, abi: RentMyTentData.abi});

const _contractMap = {RentMyTent};
const getContractByName = (contractName) => {
    return _contractMap[contractName];
};

export {
    getContractByName,
    RentMyTent,
}
