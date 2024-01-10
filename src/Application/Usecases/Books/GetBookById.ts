import { IUseCase } from "Application/Common/IUseCase";
import { Book } from "../../../Domain/Entity/Book";
import AppDataSource from "../../../Infrastructure/DataSource";
import { Repository } from "typeorm";
import { GetBookByIdRequest, GetBookDetailsResponse } from "../../../Domain/Model/BookModels";

export class GetBookById implements IUseCase<GetBookByIdRequest,GetBookDetailsResponse>{

    private readonly bookRepository: Repository<Book>;
    constructor() {
        this.bookRepository = AppDataSource.getRepository(Book);
    }
    public async execute(data : GetBookByIdRequest): Promise<GetBookDetailsResponse> {

        const book = await this.bookRepository.findOne({
            where: {id: data.id},
            select: ['id','name','score']
        });

        return {
            id: book!.id,
            name: book!.name,
            score: book!.score.toString() === '-1.00' ? -1 : book!.score

        }
    }
    
}