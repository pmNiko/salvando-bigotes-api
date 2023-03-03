import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/user.model";
import generateJWT from "../helpers/generate-jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Valid user email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email or Password is incorrect",
      });
    }

    if (!user.status) {
      return res.status(400).json({
        message: "User no register",
      });
    }

    // Valid password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
