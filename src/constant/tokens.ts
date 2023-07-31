import { Token } from '../interface/wallet'
import { BigNumber } from '@ethersproject/bignumber'
export const commonTokens: Array<Token> = [
    {
        decimals: 18,
        name: "USDC Token",
        symbol: "USDC",
        totalSupply: BigNumber.from("31000000000000"),
        contractAddress: "0xBfd1d604338D132B15Ad7Dae112Cc2e1F9Fac52d",
        url: "/cph-logo.jpg",
    },
    {
        decimals: 18,
        name: "Cypherpad Token",
        symbol: "Cypherpad",
        totalSupply: BigNumber.from("31000000000000"),
        contractAddress: "0x8363638450999b65291F10E881CFFeDe262ec575",
        url: "/cph-logo.jpg",
    },
    {
        name: "Cypherium",
        decimals: 18,
        symbol: "CPH",
        contractAddress: null,
        url: "/cph-logo.jpg",
        totalSupply: BigNumber.from("100000000000000")
    },
]