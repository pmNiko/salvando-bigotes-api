import { Request, Response } from "express";

import DocumentType from "../models/document-type.model";

export const getDocumentsTypes = async (req: Request, res: Response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = { status: true };

  const [total, documentsType] = await Promise.all([
    DocumentType.countDocuments(query),
    DocumentType.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    documentsType,
  });
};

export const getDocumentType = async (req: Request, res: Response) => {
  const { id } = req.params;
  const documentType = await DocumentType.findById(id);

  res.json({
    documentType,
  });
};

export const postDocumentsTypes = async (req: Request, res: Response) => {
  const { type, name } = req.body;
  const documentType = new DocumentType({
    type,
    name,
  });

  await documentType.save();

  res.json({
    message: "Document Type create success.",
    documentType,
  });
};
