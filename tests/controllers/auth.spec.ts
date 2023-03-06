import request from "supertest";
import bcrypt from "bcrypt";

import User from "../../src/models/user.model";
import IUser from "../../src/interfaces/user.interface";
import IDocumentType from "../../src/interfaces/documentType.interface";

import app from "../../src/app";

describe.skip("POST /login Authentication", () => {
  let user: IUser;

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
  });

  const authenticateUser = (mockedUser: IUser, passwordMatch: boolean, status: boolean) => {
    jest.spyOn(User, "findOne").mockResolvedValue(mockedUser);
    jest.spyOn(bcrypt, "compareSync").mockReturnValue(passwordMatch);
    if (mockedUser) mockedUser.status = status;
  };

  it("should response status code 200", async () => {
    authenticateUser(user, true, true);

    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "test1234",
    });

    expect(response.status).toBe(200);
  });

  it("should response status code 400 (Email or Password is incorrect)", async () => {
    authenticateUser(JSON.parse("null"), true, true);

    const response = await request(app).post("/api/auth/login").send({
      email: "test@prueba.com",
      password: "test123",
    });

    expect(response.status).toBe(400);
  });

  it("should response status code 400 (User not active)", async () => {
    authenticateUser(user, true, false);

    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "test1234",
    });

    expect(response.status).toBe(400);
  });

  it("should response status code 400 (Invalid Password)", async () => {
    authenticateUser(user, false, true);

    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "test1234",
    });

    expect(response.status).toBe(400);
  });

  it("should response status code 500 (Server Error)", async () => {
    jest.spyOn(User, "findOne").mockImplementation(() => {
      throw new Error();
    });
    jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);

    const response = await request(app).post("/api/auth/login").send({
      email: "test@prueba.com",
      password: "test123",
    });

    expect(response.status).toBe(500);
  });
});
