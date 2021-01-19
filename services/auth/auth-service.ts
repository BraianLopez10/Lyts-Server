import { NullableBoolean } from "aws-sdk/clients/apigateway";
import { Model } from "mongoose";
import UserModel, {
  IUser,
  IUserBaseDocument,
} from "../../components/user/model";

class AuthService {
  constructor(private userModel: Model<IUserBaseDocument>) {}

  async userExist(username: string): Promise<Boolean> {
    const user = await this.userModel.findOne({ username });
    if (user) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
  async userCreate(user: IUser) {
    const newUser = new this.userModel(user);
    let userN = await newUser.save();
    return userN;
  }
}

export default AuthService;
