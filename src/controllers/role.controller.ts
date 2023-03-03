import { Request, Response } from "express";

import Role from "../models/role.model";

export const getRoles = async (req: Request, res: Response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { status: true };

  const [total, roles] = await Promise.all([
    Role.countDocuments(query),
    Role.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    roles,
  });
};

export const getRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = await Role.findById(id);

  res.json({
    role,
  });
};

export const postRole = async (req: Request, res: Response) => {
  const { name } = req.body;
  const role = new Role({
    name,
  });

  await role.save();

  res.json({
    message: "Role create success.",
    role,
  });
};
