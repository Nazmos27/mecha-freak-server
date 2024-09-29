import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
    name : string;
    email : string;
    password : string;
    phone : string;
    address : string;
    role : 'admin' | 'user';
}

export interface UserModelInterface extends Model<TUser> {
    isUserExistChecker(data: Record<string, unknown>): Promise<TUser>;
  
    isPasswordMatchedChecker(
      plaintextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
  
    // isAuthorizedUserChecker(email: string): Promise<boolean>;
  }

  export type TUserRole = keyof typeof USER_ROLE;
