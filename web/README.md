## Rent My Tent - Ethereum Dapp

A **Progressive Web App** for **Selling & Renting Tents**, reducing the amount of one-time-use tents that get abandoned - **No Tent Left Behind**!

Works on any Mobile or Desktop Browser, with or without a Web3 Wallet.  This is acheived through various integrations with Web-based Custodial Wallet solutions.

### Reasoning

Often people purchase tents with only a single-use in mind. This means we have many tents (camping, festivals, etc.), yet little utility.

In the UK its a particular problem at music festivals where **250,000** tents get left behind every year. This becomes nearly **900 tonnes** of plastic waste, most of which ends up in a landfill.

Tents are multi-material - nylon, metal, plastic etc., which makes them practically impossible to recycle. The average tent weighs **3.5kg** and is mostly made of plastic - the equivalent of **8750 straws**.

### System Overview

Once a tent is added to the marketplace it will always be available for rent; except during rental periods when the tent is being used by the renter.

Tents are rented from one owner to another and are listed back automatically to the marketplace after its rental period.

**Listing a Tent** involves **Registering as a Member** and paying a one-time Membership Fee.  Once registered, a member can List and Sell as many tents as desired, incentivizing a return-deposit scheme, similar to the deposit on beer cans/bottles.

### Frameworks/Software used:
 - NodeJS **v12.16.1**
 - GatsbyJS **v2.18.2**
 - React **v16.9.0**
 - Web3.js **v1.2.4**
 - Material UI
 - Wallet APIs: 
    - Arkane (coming soon)
    - Authereum
    - Fortmatic
    - MetaMask (or any browser based wallet)
    - Portis
    - Squarelink (coming soon)
    - Torus (coming soon)
    - WalletConnect

### To run Locally:
    
1 - Create a local .env.development file with the following (replace ... with your keys):
 
```bash
    GATSBY_ETH_INFURA_ID="..."
    GATSBY_ETH_JSONRPC_URL="..."
    GATSBY_ETH_CHAIN_ID="..."
    GATSBY_DFUSE_API_KEY="..."
    
    GATSBY_FORTMATIC_APIKEY="..."
    GATSBY_PORTIS_DAPP_ID="..."
    GATSBY_SQUARELINK_DAPP_ID="..."
    GATSBY_ARKANE_CLIENT_ID="..."
```

2 - yarn install

3 - yarn start

See package.json for more scripts

~~__________________________________~~

_MIT License_

Copyright (c) 2020 Rent-My-Tent-Team

