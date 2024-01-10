import { BorrowBookRequest, ReturnBookRequest } from 'Domain/Model/BorrowingModels'

export class BorrowValidator {
    public static validateBorrowBook(params: Record<string, unknown>): BorrowBookRequest {
        if (typeof parseInt(params.userid as string) !== 'number' || typeof parseInt(params.bookid as string) !== 'number') {
          throw new Error('validation error')
        }
    
        return {
          userId: parseInt(params.userid as string),
          bookId: parseInt(params.bookid as string)
        }
      }
      public static validateReturnBook(params: Record<string, unknown>, payload: Record<string, unknown>): ReturnBookRequest {
        if (typeof parseInt(params.userid as string) !== 'number' || typeof parseFloat(params.bookid as string) !== 'number' || 
            typeof parseFloat(payload.score as string) !== 'number') {
          throw new Error('validation error')
        }
    
        return {
          userId: parseInt(params.userid as string),
          bookId: parseInt(params.bookid as string),
          score: parseFloat(payload.score as string)
        }
      }
}