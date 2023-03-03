import { Request, Response } from "express";

import Pets from "../models/pet.model";

export const getPets = async (req: Request, res: Response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { status: true };

  const [total, pets] = await Promise.all([
    Pets.countDocuments(query),
    Pets.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    pets,
  });
};

export const getPet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const pets = await Pets.findById(id);

  res.json({
    pets,
  });
};

export const postPet = async (req: Request, res: Response) => {
  const { type, name, photoPet, user } = req.body;
  const pet = new Pets({
    type,
    name,
    photoPet,
    user,
  });

  await pet.save();

  res.json({
    message: "Pet create success.",
    pet,
  });
};

export const putPet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...pet } = req.body;

  const petDB = await Pets.findByIdAndUpdate(id, pet);

  res.json({
    message: "Pet update success.",
    petDB,
  });
};

export const deletePet = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Physical Delete
  // const user = await User.findByIdAndDelete(id);

  // Virtual Delete
  const pet = await Pets.findByIdAndUpdate(id, { status: false });
  // const userAuth = req.user; TODO:

  res.json({ pet });
};
