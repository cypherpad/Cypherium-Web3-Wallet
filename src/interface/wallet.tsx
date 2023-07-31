import { BigNumber } from "ethers"

export type Account = {
    address : String
    privateKey : String
    publicKey : String
    name : String
    index : Number   
    mnemonic : String
}
export type Token = {
    name : String
    symbol : String
    decimals : Number
    totalSupply : BigNumber
    contractAddress? : String
    url? : String
}
export type Sender = {
    address : String
    name? : String
}
export type Receiver = {
    address : String
}
export type TransactionValue = {
    exactValue : BigNumber
    smallValue : Number
}
export type AccountTransaction = {
    token : Token
    sender : Sender
    receiver : Receiver
    value : TransactionValue
    time : String
}
export type TransactionHistory ={
    token : Token,
    value : string,
    to : string,
    fee : string,
    txId : string,
    status : string,
    from : string
}
export type WalletConnectCallbackParam = {
    network : any,
    accounts : Array<Account>
}