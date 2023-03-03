import { Router } from "express";
import { check } from "express-validator";

import {
  existDocumentTypeById,
  existDocumentType,
} from "../helpers/db-validators";

import validFields from "../middlewares/valid-fields";
import validJWT from "../middlewares/valid-jwt";
import { isAdminRole, haveRole } from "../middlewares/valid-roles";

import {
  getDocumentsTypes,
  getDocumentType,
  postDocumentsTypes,
} from "../controllers/document-type.controller";

const router = Router();

router.get("/", getDocumentsTypes);

router.get(
  "/:id",
  [
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existDocumentTypeById),
    validFields,
  ],
  getDocumentType
);

router.post(
  "/",
  [
    validJWT,
    isAdminRole,
    haveRole("ADMIN_ROLE"),
    check("type", "Type is required").not().isEmpty(),
    check("type").custom(existDocumentType),
    check("name", "Name is required").not().isEmpty(),
    validFields,
  ],
  postDocumentsTypes
);

export default router;
