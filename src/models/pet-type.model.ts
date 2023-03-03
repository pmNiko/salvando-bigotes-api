import { Schema, model } from "mongoose";

import IPetType from "../interfaces/petType.interface";

const PetTypeSchema = new Schema<IPetType>(
  {
    name: {
      type: String,
      require: [true, "The name is required."],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

PetTypeSchema.methods.toJSON = function () {
  const { __v, _id, ...petType } = this.toObject();
  petType.uid = _id;
  return petType;
};

export default model("PetsTypes", PetTypeSchema);
