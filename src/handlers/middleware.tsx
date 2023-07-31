import { NextApiRequest, NextApiResponse } from "next";
import { environment } from "../environment/environment";
import Cors from 'cors';
type AuthParam = {
  request: NextApiRequest;
  response : NextApiResponse;
};
function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);
async function auth(param: AuthParam): Promise<boolean> {
  await cors(param.request,param.response);
  var authorization = param.request.headers.authorization;
  // if (authorization != environment.authorizationApp) {
  //   return false;
  // }
  return true;
}
export { auth };
