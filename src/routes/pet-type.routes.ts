import { Router } from "express";
import { check } from "express-validator";

import {
  getPetsTypes,
  getPetType,
  postPetType,
} from "../controllers/pet-type.controller";

import validFields from "../middlewares/valid-fields";
import validJWT from "../middlewares/valid-jwt";
import { isAdminRole, haveRole } from "../middlewares/valid-roles";
import { existPetsTypesById, existPetType } from "../helpers/db-validators";

const router = Router();

router.get("/", getPetsTypes);

router.get(
  "/:id",
  [
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existPetsTypesById),
    validFields,
  ],
  getPetType
);

router.post(
  "/",
  [
    validJWT,
    isAdminRole,
    haveRole("ADMIN_ROLE"),
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(existPetType),
    validFields,
  ],
  postPetType
);

export default router;
