import { JwtHelperService } from "@auth0/angular-jwt";
import { CONSTANTS } from "../lib/constants";

 
const jwt = new JwtHelperService();

export const decode = (token: any) => {
  return jwt.decodeToken(token);
};