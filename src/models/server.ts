import express, { Application } from "express";
import cors from "cors";

import dbConnection from "../db/config";
import appRoutes from "../routes/auth.routes";
import userRoutes from "../routes/user.routes";
import doccumentsTypeRoutes from "../routes/document-type.routes";
import rolesRoutes from "../routes/role.routes";
import petsRoutes from "../routes/pet.routes";
import petsTypesRoutes from "../routes/pet-type.routes";

class Server {
  private app: Application;
  private port: string;
  private paths;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.paths = {
      auth: "/api/auth",
      documentsTypes: "/api/documents-types",
      roles: "/api/roles",
      petsTypes: "/api/pets-types",
      pets: "/api/pets",
      users: "/api/users",
    };

    // Middlewares:
    this.middlewares();

    // Routes:
    this.routes();

    // DB Connection:
    this.dbConnection();
  }

  async dbConnection() {
    await dbConnection();
  }

  middlewares() {
    // Cors:
    this.app.use(cors());

    // Request Body Parse:
    this.app.use(express.json());

    // Public Folder:
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, appRoutes);
    this.app.use(this.paths.users, userRoutes);
    this.app.use(this.paths.documentsTypes, doccumentsTypeRoutes);
    this.app.use(this.paths.roles, rolesRoutes);
    this.app.use(this.paths.pets, petsRoutes);
    this.app.use(this.paths.petsTypes, petsTypesRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening: ${this.port}.`);
    });
  }
}

export default Server;
