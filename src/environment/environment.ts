import { BigNumber } from "ethers";
import Common from "ethereumjs-common";

export const environment = {
  authorizationApp : 'secretwkwkwkwk',
  production: false,
  requestTimeout: 30000,
  appServerUrl: "https://walletserver.cypherium.io", /// APPServer API
  swapAppUrl : 'http://localhost:3000', /// need to change when build
  appUrl : 'http://localhost:3001',  /// need to change when build,
  cypherium: {
    rpcApi : "https://rcp.cypherpad.com/rpc",
    provider: "https://rcp.cypherpad.com/rpc?network=testnet",
    chainId :12124,
    name : 'testnet',
    authorization: "kla7771ksdasbc===",
    headers: [
      {
        name: "Authorization",
        value: "kla7771ksdasbc===",
      },
    ],
    pledgeContractAddr: "0x0000000000000000000000000000000000000081",
    pledgeContractAbi: null,
    privateKey: "",
  },
  tokens : [
    {
      name: "Cypherium",
      decimals: 18,
      symbol: "CPH",
      contractAddress: null,
      url: "/cph-logo.jpg",
      totalSupply : BigNumber.from("100000000000000")
    },
    {
      name : "Cypherpad Token",
      decimals:18,
      symbol : "Cypherpad",
      contractAddress:"0x8363638450999b65291F10E881CFFeDe262ec575",
      url : "/cph-logo.jpg",
      totalSupply : BigNumber.from("100000000000000"),
    }
  ],
  currency: "usd",
  tabItems: [
    {
      name: "Assets",
    },
    {
      name: "Transaction",
    },
  ],
  endpoints : {
    getWalletBalanceBulk : '/wallet/balance/bulk' 
  },
  mainnet :{
    provider: "https://rcp.cypherpad.com/rpc?network=mainnet",
    chainId :16164,
    name : 'mainnet'
  },
  testnet :{
    provider: "https://rcp.cypherpad.com/rpc?network=testnet",
    chainId :12124,
    name : 'testnet'
  },
  common :  Common.forCustomChain(
    'mainnet',
    {
      name: 'cypherium-network',
      networkId: 16162,
      chainId: 16162,
    },
    'petersburg',
  )
};
