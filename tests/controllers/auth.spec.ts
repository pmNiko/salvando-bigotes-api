import request from "supertest";
import mongoose from "mongoose";

import dbConnection from "../../src/db/config";
import app from "../../src/app";

describe("POST /login Authentication", () => {
  beforeAll(async () => {
    await dbConnection(); // Conectar a la base de datos antes de las pruebas
  });

  afterAll(async () => {
    await mongoose.disconnect(); // Desconectar de la base de datos después de las pruebas
  });

  it("should response status code 200", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "test1234",
    });

    expect(response.status).toBe(200);
  });

  it("should response status code 400", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "test123",
    });

    expect(response.status).toBe(400);
  });

  it("should response status code 400 (Email or Password is incorrect)", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@prueba.com",
      password: "test123",
    });

    expect(response.status).toBe(400);
  });

  it("should response status code 500 (Server Error)", async () => {
    await mongoose.disconnect();
    const response = await request(app).post("/api/auth/login").send({
      email: "test@prueba.com",
      password: "test123",
    });

    expect(response.status).toBe(500);
  });

  // TODO: test para validar si el usuario esta activo.
});
