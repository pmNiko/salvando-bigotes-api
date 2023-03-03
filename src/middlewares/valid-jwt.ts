import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User from "../models/user.model";
import IUser from "../interfaces/user.interface";

const validJWT = async (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      message: "Access Denied - Token not found.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        message: "Access Denied - User not exist.",
      });
    }

    if (!user.status) {
      return res.status(401).json({
        message: "Access Denied - User not active.",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Access Denied - Token not valid.",
    });
  }
};

export default validJWT;
