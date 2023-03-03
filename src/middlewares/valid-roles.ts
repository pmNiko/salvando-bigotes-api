import { NextFunction, Request, Response } from "express";

import IUser from "../interfaces/user.interface";

export const isAdminRole = (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(500).json({
      message: "Verify role failed. Token not verify.",
    });
  }

  const { role, firstName, lastName } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      message: `${firstName} ${lastName} not role Admin.`,
    });
  }

  next();
};

export const haveRole = (...roles: string[]) => {
  return (
    req: Request & { user?: IUser },
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(500).json({
        message: "Verify role failed. Token not verify.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: `Service required any roles: ${roles}`,
      });
    }

    next();
  };
};
