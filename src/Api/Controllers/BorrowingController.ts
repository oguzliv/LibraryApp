import {UserValidator} from '../Validators/UserValidator'
import { CreateUser } from '../../Application/Usecases/Users/CreateUser'
import { GetUsers } from '../../Application/Usecases/Users/GetUsers'

interface IControllerRequest {
  body: Record<string, unknown>
}

interface IControllerResponse {
  status: number
  body?: Record<string, any>
}

export class BorrowingController {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly getUsersUseCase: GetUsers
  ) {}

  public async borrowBook(req: IControllerRequest): Promise<IControllerResponse> {
    const createUserData = UserValidator.validateCreateUser(req.body)
    const createUserOutputData = await this.createUserUseCase.execute(createUserData)

    return {
      status: 200,
      body: createUserOutputData
    }
  }

  public async returnBook(req: IControllerRequest): Promise<IControllerResponse> {

    // const createUserData = UserValidator.validateCreateUser(req.body)
    const users = await this.getUsersUseCase.execute({});

    return {
      status: 200,
      body: users
    }
  }
}