import { IUseCase } from "Application/Common/IUseCase";
import AppDataSource from "../../../Infrastructure/DataSource";
import { Book } from "../../../Domain/Entity/Book";
import { CreateBookRequest, CreateBookResponse } from "Domain/Model/BookModels";

export class CreateBook implements IUseCase<CreateBookRequest,CreateBookResponse>{
    /**
     *
     */
    private readonly bookRepository;
    constructor() {
        this.bookRepository = AppDataSource.getRepository(Book);
    }
    public async execute(data: CreateBookRequest): Promise<CreateBookResponse> {
        const book = new Book();
        book.name = data.name;
        book.createdAt = new Date();
        book.score = -1;

        await this.bookRepository.save(book);
        
        return {
            name: book.name,
        };
    }
    
}