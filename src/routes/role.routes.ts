import { Router } from "express";
import { check } from "express-validator";

import { getRole, getRoles, postRole } from "../controllers/role.controller";

import {
  existRoleById,
  existRole,
} from "../helpers/db-validators";

import validFields from "../middlewares/valid-fields";
import validJWT from "../middlewares/valid-jwt";
import { isAdminRole, haveRole } from "../middlewares/valid-roles";

const router = Router();

router.get("/", getRoles);

router.get(
  "/:id",
  [
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existRoleById),
    validFields,
  ],
  getRole
);

router.post(
  "/",
  [
    validJWT,
    isAdminRole,
    haveRole("ADMIN_ROLE"),
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(existRole),
    validFields,
  ],
  postRole
);

export default router;
