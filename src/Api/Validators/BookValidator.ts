import { CreateBookRequest, GetBookByIdRequest } from "Domain/Model/BookModels"

export class BookValidator {
    public static validateCreateBook(payload: Record<string, unknown>): CreateBookRequest {
        if (typeof payload.name !== 'string') {
          throw new Error('validation error')
        }
    
        return {
          name: payload.name
        }
      }
      public static validateGetBookById(params: Record<string,unknown>) : GetBookByIdRequest {

        if (typeof parseInt(params.id as string) !== 'number') {
            throw new Error('validation error')
          }
      
          return {
            id: parseInt(params.id as string)
          }
      }
}

