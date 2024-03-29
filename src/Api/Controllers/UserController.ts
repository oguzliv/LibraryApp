import {UserValidator} from '../Validators/UserValidator'
import { CreateUser } from '../../Application/Usecases/Users/CreateUser'
import { GetUsers } from '../../Application/Usecases/Users/GetUsers'
import { GetUserById } from 'Application/Usecases/Users/GetUserById'

interface IControllerRequest {
  body: Record<string, unknown>
  params: Record<string, unknown>
}

interface IControllerResponse {
  status: number
  body?: Record<string, any>
}

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly getUsersUseCase: GetUsers,
    private readonly getUserByIdUseCase: GetUserById
  ) {}

  public async createUser(req: IControllerRequest): Promise<IControllerResponse> {
    const createUserData = UserValidator.validateCreateUser(req.body)
    const createUserOutputData = await this.createUserUseCase.execute(createUserData)

    return {
      status: 200,
      body: createUserOutputData
    }
  }

  public async getUsers(req: IControllerRequest): Promise<IControllerResponse> {

    const users = await this.getUsersUseCase.execute({});

    return {
      status: 200,
      body: users
    }
  }

  public async getUserById(req:IControllerRequest): Promise<IControllerResponse> {
    const userId = UserValidator.validateGetUserById(req.params);
    const user = await this.getUserByIdUseCase.execute(userId);

    return {
        status: 200,
        body: user!
    }
  }
}
