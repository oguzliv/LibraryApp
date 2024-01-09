import AppDataSource from "Infrastructure/DataSource";
import { UserController } from "../src/Api/Controllers/UserController";
import { CreateUser } from "../src/Application/Usecases/Users/CreateUser"
import {HttpServer} from '../src/Infrastructure/HttpServer'

void main()

async function main() {
  // infra
  
  // repositories

  // network apis

  // use cases
  const createUserUseCase  = new CreateUser();

  // controllers
  const userController = new UserController(createUserUseCase)

  const httpServer = new HttpServer({ user: userController })

  await httpServer.start(8080)
}