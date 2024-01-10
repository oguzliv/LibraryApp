import { IUseCase } from "Application/Common/IUseCase";
import { Book } from "../../../Domain/Entity/Book";
import AppDataSource from "../../../Infrastructure/DataSource";
import { Repository } from "typeorm";
import { GetBookByIdRequest, GetBookDetailsResponse } from "../../../Domain/Model/BookModels";
import { GetUserByIdRequest, UserDetailsResponse } from "../../../Domain/Model/UserModels";
import { User } from "../../../Domain/Entity/User";
import { Borrowing } from "../../../Domain/Entity/Borrowing";

export class GetUserById implements IUseCase<GetUserByIdRequest,UserDetailsResponse>{

    private readonly userRepository: Repository<User>;
    private readonly borrowRepository: Repository<Borrowing>;
    private readonly bookRepository: Repository<Book>;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.borrowRepository = AppDataSource.getRepository(Borrowing);
        this.bookRepository = AppDataSource.getRepository(Book);
    }
    public async execute(data : GetUserByIdRequest): Promise<UserDetailsResponse> {

        const relations = this.userRepository.metadata.relations.map(m => m.propertyName)
        const result = await this.userRepository.findOne({
            where: {id : data.id},
            relations: relations
        });


        console.log(result!['borrowings'])

        return {
            id: 1,
            name: "",
            books: {
                past : [],
                present : [],
            }

        }
    }
    
}