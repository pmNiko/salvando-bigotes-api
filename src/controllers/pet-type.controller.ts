import { Request, Response } from "express";

import PetsTypes from "../models/pet-type.model";

export const getPetsTypes = async (req: Request, res: Response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { status: true };

  const [total, petsTypes] = await Promise.all([
    PetsTypes.countDocuments(query),
    PetsTypes.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    petsTypes,
  });
};

export const getPetType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const petsTypes = await PetsTypes.findById(id);

  res.json({
    petsTypes,
  });
};

export const postPetType = async (req: Request, res: Response) => {
  const { name } = req.body;
  const petsTypes = new PetsTypes({
    name,
  });

  await petsTypes.save();

  res.json({
    message: "Pet Type create success.",
    petsTypes,
  });
};
