import { Router } from "express";
import { check } from "express-validator";

import validFields from "../middlewares/valid-fields";
import validJWT from "../middlewares/valid-jwt";
import { isAdminRole, haveRole } from "../middlewares/valid-roles";

import {
  isValidRole,
  existUserById,
  existEmail,
  existDocumentTypeById,
} from "../helpers/db-validators";
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getUsers);

router.get(
  "/:id",
  [
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existUserById),
    validFields,
  ],
  getUser
);

router.post(
  "/",
  [
    validJWT,
    check("firstName", "Firstname is required").not().isEmpty(),
    check("lastName", "Lastname is required").not().isEmpty(),
    check("email", "Email not valid").isEmail(),
    check("email").custom(existEmail),
    check("password", "Password is required and 8 or 15 characters").isLength({
      min: 8,
    }),
    check("password", "Password is required and 8 or 15 characters").isLength({
      max: 20,
    }),
    check("photoDocumentUser", "Document Photo is required").not().isEmpty(),
    check("phone", "Phone is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check(
      "documentType",
      "Document Type is required. ID not is valid"
    ).isMongoId(),
    check("documentType").custom(existDocumentTypeById),
    check(
      "numberDocument",
      "Document Number is required and 8 or 15 characters"
    ).isLength({ min: 6 }),
    check(
      "numberDocument",
      "Document Number is required and 8 or 15 characters"
    ).isLength({ max: 20 }),
    check("role").custom(isValidRole),
    validFields,
  ],
  postUser
);

router.put(
  "/:id",
  [
    validJWT,
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isValidRole),
    validFields,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    validJWT,
    isAdminRole,
    haveRole("ADMIN_ROLE"),
    check("id", "ID not is valid").isMongoId(),
    check("id").custom(existUserById),
    validFields,
  ],
  deleteUser
);

export default router;
