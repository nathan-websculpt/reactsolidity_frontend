//MetaMask Connector

import { InjectedConnector } from "@web3-react/injected-connector";

export const Injected = new InjectedConnector({ //InjectedConnector for MetaMask (there are other connectors for other wallets)
    supportedChainIds: [1, 3, 4, 5, 42],
})