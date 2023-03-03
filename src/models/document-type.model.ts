import { Schema, model } from "mongoose";

import IDocumentType from "../interfaces/documentType.interface";

const DocumentTypeSchema = new Schema<IDocumentType>(
  {
    type: {
      type: String,
      require: [true, "The type is required."],
      unique: true,
    },
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

DocumentTypeSchema.methods.toJSON = function () {
  const { __v, _id, ...documentType } = this.toObject();
  documentType.uid = _id;
  return documentType;
};

export default model("DocumentsTypes", DocumentTypeSchema);
