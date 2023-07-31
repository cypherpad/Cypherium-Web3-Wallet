import * as Web3c from "@cypherium/web3c";
import { environment } from "../environment/environment";
import * as sha from "sha.js";
import * as CypheriumTx from "cypheriumjs-tx";
import { BigNumber, ethers } from "ethers";
const TX_VERSION = "0x122";
const TX_DEFAULT_GASLIMIT = "0x5208";
const abi = require("../../public/pledge.abi.json");
import { Wallet, Signer } from "ethers";
const secp256k1 = require("secp256k1");
import { Transaction } from "@ethereumjs/tx";
import Common from "ethereumjs-common";
import { Token, TransactionHistory } from "../interface/wallet";
type GetWalletsBalance = {
  address: String;
  contractAddress?: String;
};
export class Web3Service {
  public web3c;
  private pledgeContract;
  constructor(private provider : any,) {
    this.web3c = new Web3c(
      new Web3c.providers.HttpProvider(
        provider.provider,
        null,
        null,
        null,
        environment.cypherium.headers
      )
    );
    this.pledgeContract = new this.web3c.cph.contract(
      abi,
      environment.cypherium.pledgeContractAddr
    );
  }
  async isCphAddr(addr) {
    if (!addr) {
      return -1;
    }
    addr = addr.toLowerCase();
    if (!addr.startsWith("cph")) {
      return -2;
    }
    let result = await this.web3c.isAddress("0x" + addr.slice(3));
    return result ? 0 : -2;
  }

  async getBlockHeight() {
    let height = await this.web3c.cph.txBlockNumber;
    return height;
  }

  async getKeyBlockHeight() {
    let height = await this.web3c.cph.keyBlockNumber;
    return height;
  }

  initContract(name, abi, addr) {
    if (this[name]) {
      return this[name];
    } else {
      this[name] = new this.web3c.cph.contract(abi, addr);
      console.log("Contract initializes successfully:", name, addr);
      return this[name];
    }
  }

  async getCphBalance(userAddr, pending = false) {
    try {
      console.log("getCphBalance");
      var v = await this.web3c.cph.getBalance(
        userAddr,
        pending ? "pending" : "latest"
      );
      console.log(v);
      return BigNumber.from(v.c[0] / 10000);
    } catch (e) {
      throw e;
    }
  }
  async getWalletBalance(
    getWalletBalanceParams: GetWalletsBalance[],
    currency: String
  ) {
    var url =
      environment.cypherium.rpcApi + environment.endpoints.getWalletBalanceBulk + `?network=${this.provider.name}`;
    try {
      console.log(`${url}`);
      var response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          currency: currency,
          data: getWalletBalanceParams,
        }),
        headers: {
          Authorization: environment.cypherium.authorization,
          "Content-Type": "application/json",
        },
      });
      if (response.status != 200) {
        throw response.statusText;
      }
      var body = await response.json();
      return body;
    } catch (e) {
      throw e;
    }
  }

  getMortage(from) {
    return new Promise((resolve, reject) => {
      this.pledgeContract.methods
        .mortgageOf(from)
        .call({ from: from }, (err, result) => {
          if (err) {
            resolve(0);
          } else {
            console.log("pledge", result);
            let value = this.web3c.fromWei(result + "", "cpher");
            resolve(value);
          }
        });
    });
  }

  async pledge(type, from, amount, privateKey, callback) {
    amount = this.web3c.toWei(amount + "", "cpher");
    let gasPrice = await this.web3c.cph.getGasPrice();
    if (!gasPrice || gasPrice == "0") {
      gasPrice = this.web3c.toWei(18, "gwei");
    }
    let params = type == "mortgage" ? [from, amount] : [amount];
    // let tx = await this.generateCphTx(
    //   from,
    //   environment.cypherium.pledgeContractAddr,
    //   "0x0",
    //   gasPrice,
    //   privateKey,
    //   "pledgeContract",
    //   type,
    //   params
    // );
    //const serializedTx = tx.serialize();
    this.web3c.cph.sendSignedTransaction("0", callback); //Call the contract
  }
  async transferCph(
    from,
    to,
    value,
    gas,
    privateKey,
    pending,
    mnemonic: string,
    token?: Token,
    onSuccess?: (transactionHistory: TransactionHistory) => void,
    onFail?: (message: string) => void
  ) {
    console.log(
      `initiate transfer----from:${from},to:${to},value:${value}, mnemonic ${mnemonic} privateKey ${privateKey}`
    );
    value = this.web3c.toWei(value, "cpher");
    gas = this.web3c.toWei(gas, "gwei");
    console.log("gas to gwei: ", gas);
    let tx = await this.generateCphTx(
      from,
      to,
      value,
      gas,
      privateKey,
      pending,
      mnemonic
    );
    console.log(
      "Transaction signature：",
      "0x" + tx.serialize().toString("hex")
    );
    return new Promise((resolve, reject) => {
      this.web3c.cph.sendRawTransaction(
        "0x" + tx.serialize().toString("hex"),
        async (err, tx) => {
          console.log("Transaction callback.......", err, tx);
          if (err === null) {
            // resolve(tx);
            //console.log("transaction success ", tx);
            let navigationExtras = {
              state: {
                tx: tx,
                status: 1, //0- success, 1: packed, 2: failure
              },
            };
            // data = null;
            resolve("success");
            onSuccess({
              token: token,
              value: value,
              to: to,
              txId: tx,
              fee: "-",
              status: "0",
              from:from
            });
            // Go to the transaction results page
            //this.router.navigate(['transaction-result'], navigationExtras);
          } else {
            onFail(err.toString());
          }
        }
      );
    });

    // let tx = await this.signTransaction(
    //   from,
    //   to,
    //   value,
    //   gas,
    //   privateKey,
    //   pending,
    //   mnemonic
    // );
    // console.log(`TX : ${tx}`);
    // this.web3c.cph.sendRawTransaction(tx);
  }
  async signTransaction(
    from,
    to,
    value,
    gas,
    privateKey, //Account private key, used for signing
    pending,
    mnemonic,
    contractName = "",
    funcname = "",
    params = null
  ) {
    console.log(`mnemonic ${mnemonic}`);
    var walletMnemonic = new Wallet(privateKey);
    var address = await walletMnemonic.getAddress();
    console.log(`Address : ${address}`);
    try {
      var nonce = await this.web3c.cph.getTransactionCount(
        from.toLowerCase(),
        "pending"
      ); //Get the address of the user's walletnonce
    } catch (error) {
      var nonce = await this.web3c.cph.getTransactionCount(from.toLowerCase()); //Get the address of the user's walletnonce
    }
    let gasPrice = await this.web3c.cph.getGasPrice();
    if (!gasPrice || gasPrice == "0") {
      gasPrice = this.web3c.toWei(20, "gwei");
    }
    console.log("gasePrice:", gasPrice);
    console.log("this.convert10to16(gasPrice):", this.convert10to16(gasPrice));
    let txParams = {
      nonce: nonce,
      gasLimit: "0x5208",
      gasPrice: this.convert10to16(gasPrice),
      to: to,
      value: BigNumber.from(value),
      chainId: environment.cypherium.chainId,
      from: from,
    };
    console.log(`tx params : ${JSON.stringify(txParams)}`);
    var tx = walletMnemonic.signTransaction(txParams);
    return tx;
  }
  async generateCphTx(
    from,
    to,
    value,
    gas,
    privateKey, //Account private key, used for signing
    pending,
    contractName = "",
    funcname = "",
    params = null
  ) {
    let data = "";
    if (params) {
      var thisobj = this[contractName].methods[funcname]; //Extract the function from the target contract object
      data = thisobj.apply(thisobj, params).encodeABI(); //Encapsulate parameters as contract parameters
    }

    try {
      var nonce = await this.web3c.cph.getTransactionCount(
        from.toLowerCase(),
        "pending"
      ); //Get the address of the user's walletnonce
    } catch (error) {
      var nonce = await this.web3c.cph.getTransactionCount(from.toLowerCase()); //Get the address of the user's walletnonce
    }
    let gasPrice = await this.web3c.cph.getGasPrice();
    if (!gasPrice || gasPrice == "0") {
      gasPrice = this.web3c.toWei(20, "gwei");
    }
    if (gas == "0") {
      gas = "20000";
    }
    console.log("gasePrice:", gasPrice);
    console.log("this.convert10to16(gasPrice):", this.convert10to16(gasPrice));
    let txParams = {
      senderKey: "0x" + privateKey.substring(64, 128),
      nonce: nonce,
      gasLimit: "0x5208",
      gasPrice: this.convert10to16(gasPrice),
      to: to,
      value: BigNumber.from(value).toHexString(),
    };
    console.log("Hex to number: ", txParams.gasPrice);
    console.log("Transfer parameters：" + JSON.stringify(txParams));
    // return this.web3c.cph.accounts.signTransaction(txParams, privateKey);

    const tx = new CypheriumTx.Transaction(txParams, {
      common: Common.forCustomChain(
        "ropsten",
        {
          chainId: this.provider.chainId,
          url: this.provider.provider,
        },
        "petersburg"
      ),
    });
    console.log("tx: ", tx);

    // let privateKeyBuffer = Buffer.from(privateKey, 'hex');
    // // tx.sign(privateKeyBuffer);

    var p = new Uint8Array(this._hexStringToBytes(privateKey));
    var k = new Uint8Array(
      this._hexStringToBytes(privateKey.substring(64, 128))
    );
    privateKey = null;
    txParams = null;
    parseFloat;
    tx.sign(p);
    return tx;
  }

  async getTxDetail(tx) {
    let result = await this.web3c.cph.getTransaction(tx);
    result.value = this.web3c.fromWei(result.value, "cpher");
    result.gasPrice = this.web3c.fromWei(result.gasPrice, "cpher");
    return result;
  }
  async subscribeTransactionLog(tx) {
    var transaction = await this.getTxDetail(tx);
    while (
      transaction.blockHash != undefined &&
      transaction.blockHash != null
    ) {
      transaction = await this.getTxDetail(tx);
    }
    return transaction;
  }

  computeSha256Hash(str) {
    const sha256 = sha("sha256");
    const msgHash = sha256.update(str, "utf8").digest("hex");
    return msgHash;
  }

  strToBase64(str) {
    let strBase64 = new Buffer(str, "hex").toString("base64");
    return strBase64;
  }

  base64ToStr(base64) {
    let str = new Buffer(base64, "base64").toString("hex");
    return str;
  }

  strToBuffer(str, type) {
    console.log(str + "Is about to be turned into a Buffer object");
    if (type === "hex") {
      return Buffer.from(str, "hex");
    } else {
      return Buffer.from(str);
    }
  }

  floatMultiple(f1, f2) {
    let m1 = new this.web3c.BigNumber(f1),
      m2 = new this.web3c.BigNumber(f2);
    return m1.mul(m2);
  }

  bufferToStr(buf, type) {
    if (type) {
      return buf.toString(type);
    } else {
      return buf.toString();
    }
  }

  convert10to16(n) {
    if (typeof n !== "string") {
      n = n.toString();
    }
    if (n.startsWith("0x")) {
      return n;
    }
    return this.web3c.toHex(n);
  }

  _hexStringToBytes(hexStr) {
    let result = [];
    while (hexStr.length >= 2) {
      result.push(parseInt(hexStr.substring(0, 2), 16));
      hexStr = hexStr.substring(2, hexStr.length);
    }
    return result;
  }

  _bytesToHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }
  signMessage(message,privateKey){
    const signingKey = new ethers.utils.SigningKey(privateKey);
    const digest = ethers.utils.id(message);
    const signature = signingKey.signDigest(digest);
    console.log(JSON.stringify(signature));
    const joinedSignature = ethers.utils.joinSignature(signature);
    return joinedSignature;
  }
  generateNonce(){
    return Math.floor(Math.random() * 1000);
  }
  // _getRVS(publicKey){
  //   var sig = secp256k1.sign(msgHash, privateKey)
  //   var ret = {}
  //   ret.r = sig.signature.slice(0, 32)
  //   ret.s = sig.signature.slice(32, 64)
  //   ret.v = sig.recovery + 27
  // }
}
