import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { Book } from "../Domain/Entity/Book";
import { User } from "../Domain/Entity/User";
import { Borrowing } from "../Domain/Entity/Borrowing";

const config = dotenv.config();

// const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
//   process.env;

//   console.log("pass : ", DB_PASSWORD);
//   console.log(config);

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt("5432"),
  username: "postgres",
  password: "Liv413_*",
  database: "LibraryDB",
  synchronize: true,
  logging: true,
  entities: [User, Book, Borrowing],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});

export default AppDataSource;

// DB_HOST = localhost
// DB_PORT = 5432
// DB_USERNAME = postgres
// DB_PASSWORD = Liv413_*
// DB_DATABASE = LibraryDB

// npx typeorm-ts-node-commonjs -d ./src/Infrastructure/DataSource.ts migration:generate ./src/Infrastructure/Migrations
