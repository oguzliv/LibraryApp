import { CreateUserRequest, GetUserByIdRequest } from 'Domain/Model/UserModels'

export class UserValidator {
  public static validateCreateUser(payload: Record<string, unknown>): CreateUserRequest {
    if (typeof payload.name !== 'string') {
      throw new Error('validation error')
    }

    return {
      name: payload.name
    }
  }

  public static validateGetUserById(params: Record<string,unknown>) : GetUserByIdRequest {

    if (typeof parseInt(params.id as string) !== 'number') {
        throw new Error('validation error')
      }
  
      return {
        id: parseInt(params.id as string)
      }
  }
}