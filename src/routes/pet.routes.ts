import { Router } from "express";
import { check } from "express-validator";

import {
  deletePet,
  getPet,
  getPets,
  postPet,
  putPet,
} from "../controllers/pet.controller";
import {
  existPetById,
  isValidPetType,
  isValidRole,
} from "../helpers/db-validators";

import validFields from "../middlewares/valid-fields";
import validJWT from "../middlewares/valid-jwt";
import { existUserById } from "../helpers/db-validators";
import { isAdminRole, haveRole } from "../middlewares/valid-roles";

const router = Router();

router.get("/", getPets);

router.get(
  "/:id",
  [
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existPetById),
    validFields,
  ],
  getPet
);

router.post(
  "/",
  [
    validJWT,
    check("type", "Type is required").not().isEmpty(),
    check("type").custom(isValidPetType),
    check("name", "Name is required").not().isEmpty(),
    check("photoPet", "Photo Pet is required").not().isEmpty(),
    check("user", "User not is valid").isMongoId(),
    check("user").custom(existUserById),
    validFields,
  ],
  postPet
);

router.put(
  "/:id",
  [
    validJWT,
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existPetById),
    validFields,
  ],
  putPet
);
router.delete(
  "/:id",
  [
    validJWT,
    isAdminRole,
    haveRole("ADMIN_ROLE"),
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existPetById),
    validFields,
  ],
  deletePet
);

export default router;
