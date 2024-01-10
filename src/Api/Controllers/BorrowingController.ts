import { BorrowBook } from '../../Application/Usecases/Borrowing/BorrowBook'
import { ReturnBook } from '../../Application/Usecases/Borrowing/ReturnBook'
import { BorrowValidator } from '../../Api/Validators/BorrowValidator'
import { Response } from 'express'

interface IControllerRequest {
  body: Record<string, unknown>
  params: Record<string, unknown>
}
interface IControllerResponse {
    status: number
    body?: Record<string, any>
  }
  
export class BorrowingController {
  constructor(
    private readonly borrowBookUseCase: BorrowBook,
    private readonly returnBookUseCase: ReturnBook
  ) {}

  public async borrowBook(req: IControllerRequest): Promise<IControllerResponse> {
    const borrowBookData = BorrowValidator.validateBorrowBook(req.params)
    const borrowBookOutputData = await this.borrowBookUseCase.execute(borrowBookData)


    return {
        status: borrowBookOutputData ? 200 : 500
    }
  }

  public async returnBook(req: IControllerRequest): Promise<IControllerResponse> {
    const returnBookData = BorrowValidator.validateReturnBook(req.params,req.body)
    const returnBookOutputData = await this.returnBookUseCase.execute(returnBookData)


    return {
        status: returnBookOutputData ? 200 : 500
    }
  }
}