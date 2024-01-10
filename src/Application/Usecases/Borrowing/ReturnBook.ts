import { IUseCase } from "Application/Common/IUseCase";
import { User } from "../../../Domain/Entity/User";
import { CreateUserRequest, CreateUserResponse } from "../../../Domain/Model/UserModels";
import AppDataSource from "../../../Infrastructure/DataSource";

export class ReturnBook implements IUseCase<CreateUserRequest,CreateUserResponse>{
    /**
     *
     */
    private readonly userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }
    public async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
        const user = new User();
        user.name = data.name;
        user.createdAt = new Date();

        await this.userRepository.save(user);
        
        return {
            name: user.name,
        };
    }
    
}