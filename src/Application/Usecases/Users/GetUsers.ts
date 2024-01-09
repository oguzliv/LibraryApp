import { IUseCase } from "Application/Common/IUseCase";
import { User } from "../../../Domain/Entity/User";
import { CreateUserRequest, CreateUserResponse, GetUsersResponse } from "../../../Domain/Model/UserModels";
import AppDataSource from "../../../Infrastructure/DataSource";
import { Repository } from "typeorm";

export class GetUsers implements IUseCase<unknown,User[]>{

    private readonly userRepository: Repository<User>;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }
    public async execute(data : any): Promise<User[]> {

        const users = await this.userRepository.find({select: {id:true,name: true}});
        
        return users;
    }
    
}