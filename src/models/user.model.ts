import { Schema, model } from "mongoose";

import IUser from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "The firstname is required"],
    },
    lastName: {
      type: String,
      required: [true, "The lastname is required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
    photoUser: {
      type: String,
      default: ''
    },
    photoDocumentUser: {
      type: String,
      required: [true, "The photo document is required"],
    },
    phone: {
      type: String,
      required: [true, "The phone is required"],
    },
    address: {
      type: String,
      required: [true, "The address is required"],
    },
    role: {
      type: String,
      required: [true, "The role is required"],
      emun: ["ADMIN_ROLE", "USER_ROLE"],
      default: "USER_ROLE",
    },
    documentType: {
      type: Schema.Types.ObjectId,
      ref: "DocumentsTypes",
      required: [true, "The document type is required"],
    },
    numberDocument: {
      type: String,
      maxlength: 20,
      minlength: 6,
      required: [true, "The number document is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model("Users", UserSchema);
