import { Sequelize, DataTypes, Dialect } from "sequelize";
import mysql2 from "mysql2"; // Needed to fix sequelize issues with WebPack

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  database: "crypto-wallet",
  password: "",
  port: 3306,
  dialectModule: mysql2,
});
const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nonce: {
    type: DataTypes.MEDIUMINT,
  },
  chain_id: DataTypes.INTEGER,
  provider: DataTypes.STRING,
  network_name: DataTypes.STRING,
  address: DataTypes.STRING,
  signature: DataTypes.STRING,
  valid_until: DataTypes.STRING,
});
type UserAttributes = {
  nonce: number;
  address: string;
  signature: string;
  chain_id: number;
  provider: string;
  network_name: string;
  valid_until: string;
};
type RepositoryResponse = {
  reason?: any;
  message: string;
};
async function connectToDatabase() {
  console.log("Trying to connect via sequelize");
  await sequelize.sync();
  await sequelize
    .authenticate()
    .then((value) => {
      console.log("success");
    })
    .catch((e) => {
      console.log(`error auth ${e}`);
    });
  console.log("=> Created a new connection.");

  // Do something
}
export class UserRepository {
  async createUserSession(user: UserAttributes): Promise<RepositoryResponse> {
    try {
      await connectToDatabase();
      var usr = await User.findOne({
        where: {
          address : user.address,
        },
      });
      if (usr === null) {
        var x = User.build(user);
        await x.save();
      } else {
        usr.update(user);
      }
      return {
        message: "success",
      };
    } catch (e) {
      console.log(`faile to create user sessiom ${e}`);
      return {
        reason: e,
        message: "cannot_create_user_session",
      };
    }
  }
}
