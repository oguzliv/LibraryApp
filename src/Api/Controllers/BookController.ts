import {BookValidator} from '../Validators/BookValidator'
import { CreateBook } from '../../Application/Usecases/Books/CreateBook'
import { GetBooks } from '../../Application/Usecases/Books/GetBooks'
import { GetBookById } from '../../Application/Usecases/Books/GetBookById'

interface IControllerRequest {
  body: Record<string, unknown>
  params: Record<string, unknown>
}

interface IControllerResponse {
  status: number
  body?: Record<string, any>
}

export class BookController {
  constructor(
    private readonly createBookUseCase: CreateBook,
    private readonly getBooksUseCase: GetBooks,
    private readonly getBooksById: GetBookById,
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
    const books = await this.getBooksUseCase.execute({});

    return {
      status: 200,
      body: books
    }
  }

  public async getBookById(req: IControllerRequest): Promise<IControllerResponse> {
    const bookId = BookValidator.validateGetBookById(req.params);
    const book = await this.getBooksById.execute(bookId);

    console.log(book);
    
    return {
        status: book ? 200 : 500,
        body: book!
    }
}
}