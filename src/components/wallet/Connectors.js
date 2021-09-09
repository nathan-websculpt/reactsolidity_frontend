//MetaMask Connector

import { InjectedConnector } from "@web3-react/injected-connector";

export const Injected = new InjectedConnector({ //InjectedConnector for MetaMask (there are other connectors for other wallets)
    supportedChainIds: [1, 3, 4, 5, 42],
})

//a core idea of Web3 (and Dapps) is the 'Connector'
//a 'Connector' is a piece of code that communicates with your Dapp, and it has two core components (wallet and node)
//has connection to wallet which can sign things and a connection to a node provider

//InjectedConnector is an abstraction layer on top of MetaMask logic