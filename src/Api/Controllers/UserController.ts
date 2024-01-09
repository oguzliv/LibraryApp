import {UserValidator} from '../Validators/UserValidator'
import { CreateUser } from '../../Application/Usecases/Users/CreateUser'

interface IControllerRequest {
  body: Record<string, unknown>
}

interface IControllerResponse {
  status: number
  body?: Record<string, any>
}

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUser,
  ) {}

  public async createUser(req: IControllerRequest): Promise<IControllerResponse> {
    console.log("here I am");
    const createUserData = UserValidator.validateCreateUser(req.body)
    const createUserOutputData = await this.createUserUseCase.execute(createUserData)

    return {
      status: 200,
      body: createUserOutputData
    }
  }
}