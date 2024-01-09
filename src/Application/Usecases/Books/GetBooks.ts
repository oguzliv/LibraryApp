import { IUseCase } from "Application/Common/IUseCase";
import { Book } from "../../../Domain/Entity/Book";
import AppDataSource from "../../../Infrastructure/DataSource";
import { Repository } from "typeorm";

export class GetBooks implements IUseCase<unknown,Book[]>{

    private readonly bookRepository: Repository<Book>;
    constructor() {
        this.bookRepository = AppDataSource.getRepository(Book);
    }
    public async execute(data : any): Promise<Book[]> {

        const books = await this.bookRepository.find({select: {id:true,name: true}});
        
        return books;
    }
    
}