import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    user,
  });
};

export const postUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    photoDocumentUser,
    phone,
    address,
    role,
    documentType,
    numberDocument,
  } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    photoDocumentUser,
    phone,
    address,
    role,
    documentType,
    numberDocument,
  });

  // Crypto password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({
    message: "User create success.",
    user,
  });
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, newPassword, google, status, ...user } = req.body;

  if (password && newPassword) {
    // Valid password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    // Crypto password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(newPassword, salt);
  } else {
    return res.status(400).json({
      message: "If you want to password, i need send newPassword.",
    });
  }

  const userDB = await User.findByIdAndUpdate(id, user);

  res.json({
    message: "User update success.",
    userDB,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Physical Delete
  // const user = await User.findByIdAndDelete(id);

  // Virtual Delete
  const user = await User.findByIdAndUpdate(id, { status: false });
  // const userAuth = req.user; TODO:

  res.json({ user });
};
