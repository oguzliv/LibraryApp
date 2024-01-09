import { CreateBookResponse } from 'Domain/Model/BookModels'

export class BookValidator {
  public static validateCreateBook(payload: Record<string, unknown>): CreateBookResponse {
    if (typeof payload.name !== 'string') {
      throw new Error('validation error')
    }

    return {
      name: payload.name
    }
  }
}