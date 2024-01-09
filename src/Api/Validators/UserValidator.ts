import { CreateUserRequest } from 'Domain/Model/UserModels'

export class UserValidator {
  public static validateCreateUser(payload: Record<string, unknown>): CreateUserRequest {
    if (typeof payload.name !== 'string') {
      throw new Error('validation error')
    }

    return {
      name: payload.name
    }
  }
}