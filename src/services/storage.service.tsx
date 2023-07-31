import cookie from "cookie"
import { Account } from "../interface/wallet";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}
export function getWalletFromLocalStorage(): Array<Account>{
  var local = localStorage.getItem('wallets');
  console.log(local);
  if(local === undefined  || local === null){
    return Array<Account>();
  }
  return JSON.parse(local);
}
