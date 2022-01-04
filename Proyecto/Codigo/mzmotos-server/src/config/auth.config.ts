import { NextFunction, Request, Response } from "express";
import userSchema from "../app/schemas/user.schema";
import { decode } from "../lib/token";

const veriftyToken = (auth: any) => {
  if (!auth) {
    return false;
  }
  const bearer = auth.split(" ");
  if (bearer[1] === null || !bearer[1]) {
    return false;
  }
  const payload: any = decode(bearer[1]);
  if (!payload) {
    return false;
  }
  return payload;
};

const verifyExistance = async (payload: any) => {
  try {
    const docResult = await userSchema.findById(payload);
    if (docResult) {
      return true;
    }
  } catch (error: any) {
    return null;
  }
  return null;
}

export const authUser = (req: Request | any, res: Response, next: NextFunction) => {
  const payload = veriftyToken(req.headers.authorization);
  if (!payload) {
    return res.status(401).json({ status: false, authorization: "Denied" });
  }
  verifyExistance(payload.token)
    .then((result) => {
      if (result) {
        req.payload = payload;
        next();
      } else {
        return res.status(401).json({ status: false, authorization: "Denied" });
      }
    }).catch(() => {
      return res.status(401).json({ status: false, authorization: "Denied" });
    });
};