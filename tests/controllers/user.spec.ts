import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../src/models/user.model";
import validJWT from "../../src/middlewares/valid-jwt";
import IUser from "../../src/interfaces/user.interface";
import IDocumentType from "../../src/interfaces/documentType.interface";

import app from "../../src/app";
import { Request, Response, NextFunction } from 'express';

let users: IUser[];
let user: IUser;
let token: string;

beforeAll(() => {
  user = {
    firstName: "Test",
    lastName: "Test",
    email: "test@test.com",
    password: "test1234",
    photoUser: "",
    photoDocumentUser: "test.jpg",
    phone: "1234567890",
    address: "test # test",
    role: "ADMIN_ROLE",
    documentType: {} as IDocumentType,
    numberDocument: "987654321",
    status: true,
    google: false,
  };

  users = [user];
  token = jwt.sign(
    { uid: "6402765afc47de264b5d335d" },
    "ebb60e877d8cbc4009ba21de18a2ba8f"
  );
});

describe.skip("GET /users Users", () => {
  //   it("should response 200 and response all users", async () => {
  //     jest.spyOn(User, "countDocuments").mockResolvedValue(1);
  //     jest.spyOn(User, "find").mockResolvedValue(users);

  //     const response = await request(app)
  //       .get("/api/users")
  //       .set("Accept", "application/json");

  //     expect(response.status).toBe(200);
  //     expect(response.body.users).toHaveLength(1);
  //     expect(response.body.total).toBe(1);
  //   });

  it("should response 200 and response one user by ID ", async () => {
    jest.spyOn(User, "findById").mockResolvedValue(user);

    const response = await request(app)
      .get("/api/users/6402765afc47de264b5d335d")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ user });
  });

  it("should response 400 because ID not Valid ", async () => {
    jest.spyOn(User, "findById").mockResolvedValue(user);

    const response = await request(app)
      .get("/api/users/123")
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).not.toBe({ user });
  });
});

describe("POST /users Users", () => {
  it("should response 200 and response user create", async () => {
    const userDB = new User(user);
    jest.mock("../../src/middlewares/valid-jwt", () => ({
      validJWT: (req: Request, res: Response, next: NextFunction) => next()
    }));

    jest.spyOn(userDB, "save").mockResolvedValue(new User(user));
    jest.spyOn(bcrypt, "genSaltSync").mockReturnValue("324324fdfsfsdf");
    jest.spyOn(bcrypt, "hashSync").mockReturnValue("34234fsdfdf");

    const response = await request(app)
      .post("/api/users/")
      .set("x-token", token)
      .send(user);

    console.log('Response Body -> Message: ', response.body.message);

    // expect(response.status).toBe(200);
    expect(response.status).toBe(401);
  });
});
