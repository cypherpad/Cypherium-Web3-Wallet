// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseBody } from "../../interface/api";
import { Web3Service } from "../../services/web3.service";
import { UserRepository } from "../../handlers/database";
import { isAddress } from "ethers/lib/utils";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody<any>>
) {
  var web3Service = new Web3Service(req.body.network);
  var userRepo = new UserRepository();
  var signature = web3Service.signMessage(
    req.body.message,
    req.body.accounts[0].address
  );
  var repo = await userRepo.createUserSession({
    address: req.body.accounts[0].address,
    chain_id: req.body.network.chainId,
    network_name: req.body.network.name,
    provider: req.body.network.provider,
    nonce: web3Service.generateNonce(),
    signature: signature,
    valid_until: (Date.now() + 86400000).toString(),
  });
  console.log(
    JSON.stringify({
      network: req.body.network,
      signature: signature,
    })
  );
  if (repo.message == "success") {
    return res.status(200).json({
      data: {
        network: req.body.network,
        signature: signature,
        address: req.body.accounts[0].address,
      },
      message: "success",
      code: 200,
    });
  } else {
    return res.status(500).json({
      data: null,
      message: repo.message,
      code: 500,
    });
  }
}
