import {BookValidator} from '../Validators/BookValidator'
import { CreateBook } from '../../Application/Usecases/Books/CreateBook'
import { GetBooks } from '../../Application/Usecases/Books/GetBooks'

interface IControllerRequest {
  body: Record<string, unknown>
}

interface IControllerResponse {
  status: number
  body?: Record<string, any>
}

export class BookController {
  constructor(
    private readonly createBookUseCase: CreateBook,
    private readonly getBooksUseCase: GetBooks
  ) {}

  public async createBook(req: IControllerRequest): Promise<IControllerResponse> {
    const createBookData = BookValidator.validateCreateBook(req.body)
    const createBookOutputData = await this.createBookUseCase.execute(createBookData)

    return {
      status: 200,
      body: createBookOutputData
    }
  }

  public async getBooks(req: IControllerRequest): Promise<IControllerResponse> {

    // const createUserData = UserValidator.validateCreateUser(req.body)
    const books = await this.getBooksUseCase.execute({});

    return {
      status: 200,
      body: books
    }
  }
}