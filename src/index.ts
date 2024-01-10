import { UserController } from "../src/Api/Controllers/UserController";
import { CreateUser } from "../src/Application/Usecases/Users/CreateUser"
import {HttpServer} from '../src/Infrastructure/HttpServer'
import { GetUsers } from "../src/Application/Usecases/Users/GetUsers";
import { GetBooks } from "../src/Application/Usecases/Books/GetBooks";
import { CreateBook } from "../src/Application/Usecases/Books/CreateBook";
import { BookController } from "../src/Api/Controllers/BookController";
import { BorrowingController } from "../src/Api/Controllers/BorrowingController";
import { BorrowBook } from "../src/Application/Usecases/Borrowing/BorrowBook";
import { ReturnBook } from "../src/Application/Usecases/Borrowing/ReturnBook";
import { GetBookById } from "../src/Application/Usecases/Books/GetBookById";
import { GetUserById } from "../src/Application/Usecases/Users/GetUserById";

void main()

async function main() {

  // use cases
  const createUserUseCase  = new CreateUser();
  const getUsersUseCase = new GetUsers();
  const getUserByIdUseCase = new GetUserById();

  const createBookUseCase = new CreateBook();
  const getBooksUseCase = new GetBooks();
  const getBookByIdUseCase = new GetBookById();

  const borrowBookUseCase = new BorrowBook();
  const returnBookUseCase = new ReturnBook();

  // controllers
  const userController = new UserController(createUserUseCase,getUsersUseCase, getUserByIdUseCase);
  const bookController = new BookController(createBookUseCase,getBooksUseCase,getBookByIdUseCase);
  const borrowingController = new BorrowingController(borrowBookUseCase,returnBookUseCase);

  const httpServer = new HttpServer({ user: userController , book: bookController, borrow: borrowingController});

  await httpServer.start(8080)
}