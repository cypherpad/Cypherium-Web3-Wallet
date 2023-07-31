// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseBody } from "../../interface/api";
import { Account } from "../../interface/wallet";
import {
  getWalletFromLocalStorage,
  parseCookies,
} from "../../services/storage.service";
import { WalletService } from "../../services/wallet/wallet.service";
import { auth } from "../../handlers/middleware";
import { environment } from "../../environment/environment";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody<Array<Account>>>
) {
  var authed = await auth({
    request: req,
    response: res,
  });
  if (authed) {
    const wallets = getWalletFromLocalStorage();
    console.log(wallets.length);
    return res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", environment.swapAppUrl)
      .setHeader("Access-Control-Allow-Methods", "GET, DELETE, HEAD, OPTIONS")
      .json({
        code: 200,
        message: "success",
        data: wallets,
      });
  }
  return res
    .status(401)
    .setHeader("Access-Control-Allow-Origin", environment.swapAppUrl)
    .setHeader("Access-Control-Allow-Methods", "GET, DELETE, HEAD, OPTIONS")
    .json({
      code: 401,
      message: "unauthorized_app",
      data: null,
    });
}
