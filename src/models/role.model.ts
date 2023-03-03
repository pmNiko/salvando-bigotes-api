import { Schema, model } from "mongoose";

import IRole from "../interfaces/roles.interface";

const RoleSchema = new Schema<IRole>(
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

RoleSchema.methods.toJSON = function () {
  const { __v, _id, ...role } = this.toObject();
  role.uid = _id;
  return role;
};

export default model("Roles", RoleSchema);
