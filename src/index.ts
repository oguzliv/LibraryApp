import { UserController } from "../src/Api/Controllers/UserController";
import { CreateUser } from "../src/Application/Usecases/Users/CreateUser"
import {HttpServer} from '../src/Infrastructure/HttpServer'
import { GetUsers } from "../src/Application/Usecases/Users/GetUsers";
import { GetBooks } from "../src/Application/Usecases/Books/GetBooks";
import { CreateBook } from "../src/Application/Usecases/Books/CreateBook";
import { BookController } from "../src/Api/Controllers/BookController";

void main()

async function main() {
  // infra

  // repositories

  // network apis

  // use cases
  const createUserUseCase  = new CreateUser();
  const getUsersUseCase = new GetUsers();

  const createBookUseCase = new CreateBook();
  const getBooksUseCase = new GetBooks();

  // controllers
  const userController = new UserController(createUserUseCase,getUsersUseCase);
  const bookController = new BookController(createBookUseCase,getBooksUseCase);

  const httpServer = new HttpServer({ user: userController , book: bookController });

  await httpServer.start(8080)
}