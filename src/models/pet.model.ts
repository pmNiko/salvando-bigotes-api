import { Schema, model } from "mongoose";

import IPet from "../interfaces/pet.interface";

const PetSchema = new Schema<IPet>(
  {
    type: {
      type: String,
      required: [true, "The type is required"],
      emun: ["DOG", "CAT"],
    },
    name: {
      type: String,
      require: [true, "The name is required."],
    },
    photoPet: {
      type: String,
      require: [true, "The photo pet is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "The user is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

PetSchema.methods.toJSON = function () {
  const { __v, _id, ...pet } = this.toObject();
  pet.uid = _id;
  return pet;
};

export default model("Pets", PetSchema);
