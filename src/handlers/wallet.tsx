import axios from "axios";
import { ApiUrl } from "../constant/apiUrl";
import { environment } from "../environment/environment";
import { Account, TransactionHistory } from "../interface/wallet";
import { ApiService, TransactionInterface } from "../services/api.service";
import { Web3Service } from "../services/web3.service";
import { UserRepository } from "./database";

async function switchWallet(
  wallet: Account,
  tokens: Array<any>,
  onSuccess?: (tokenBalance: any) => void,
  onError?: (tokenBalance: any, error: any) => void,
  network?
) {
  console.log(`network ${JSON.stringify(network)}`);
  var tokenBalance = Array();
  const web3service = new Web3Service(network);
  var params = await tokens.map((value) => {
    return {
      contractAddress: value.contractAddress,
      address: wallet.address,
    };
  });
  try {
    var walletBalance = await web3service.getWalletBalance(
      params,
      environment.currency
    );
    tokenBalance = await walletBalance.map((e, index) => {
      var tb = tokens[index];
      tb.balance = e.balance;
      tb.ui_balance = e.ui_balance;
      tb.money_balance = e.money_balance;
      tb.address = e.address;
      return tb;
    });
    if (onSuccess != null) {
      console.log(JSON.stringify(tokenBalance));
      onSuccess(tokenBalance);
    }
  } catch (e) {
    tokenBalance = await tokens.map((e, index) => {
      var tb = tokens[index];
      tb.balance = "0";
      tb.ui_balance = "0";
      tb.money_balance = 0;
      tb.address = wallet.address;
      return tb;
    });
    if (onError != null) {
      onError(tokenBalance, e);
    }
  }
}
async function getTransacstionsHandler(
  wallet: Account,
  onSuccess?: (transactions: Array<TransactionInterface>) => void,
  onError?: (error: any) => void
) {
  var apiService = new ApiService();
  try {
    var transactions = await apiService.getTransaction(
      wallet.address.toLowerCase()
    );
    if (onSuccess != null) {
      onSuccess(transactions);
    }
  } catch (e) {
    if (onError !== null) {
      onError(e);
    }
  }
}
async function addTx(tx: TransactionHistory, cookie) {
  if (cookie != null) {
    if (cookie.length > 0) {
    }
  }
}
async function getTx(req) {}
async function connectWalletCallback(message, network, accounts) {
  var response = await axios.post(environment.appUrl + "/api/sign", {
    network: network,
    accounts: accounts,
    message: message,
  });
  if (response.status == 200) {
    var res = await axios.post(
      environment.swapAppUrl + "/api/connect-wallets",
      {
        address: response.data.address,
        network: network,
        signature: response.data.signature,
      }
    );
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
export const WalletHandler = {
  switchWallet,
  getTransacstionsHandler,
  connectWalletCallback,
};
