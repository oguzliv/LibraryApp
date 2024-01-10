import { IUseCase } from "Application/Common/IUseCase";
import { User } from "../../../Domain/Entity/User";
import { CreateUserRequest, CreateUserResponse } from "../../../Domain/Model/UserModels";
import AppDataSource from "../../../Infrastructure/DataSource";
import { Borrowing } from "../../../Domain/Entity/Borrowing";
import { Book } from "../../../Domain/Entity/Book";
import { BorrowBookRequest } from "Domain/Model/BorrowingModels";

export class BorrowBook implements IUseCase<BorrowBookRequest,boolean>{
    /**
     *
     */
    private readonly borrowRepository;
    private readonly userRepository;
    private readonly bookRepository;
    constructor() {
        this.borrowRepository = AppDataSource.getRepository(Borrowing);
        this.userRepository = AppDataSource.getRepository(User);
        this.bookRepository = AppDataSource.getRepository(Book);
    }
    public async execute(data: BorrowBookRequest): Promise<boolean> {
        const user = await this.userRepository.findOneBy({id: data.userId})
        if(!user) throw new Error("User not exist");

        const book = await this.bookRepository.findOneBy({id: data.bookId})
        if(!book) throw new Error("Book not exist");

        const isTableEmpty = await this.borrowRepository.find();

        if(isTableEmpty.length === 0){
            const borrowing = new Borrowing();
            borrowing.book = book;
            borrowing.user = user;
            borrowing.borrowedAt = new Date();
            borrowing.createdAt = new Date();
            borrowing.returned = false;

            await this.borrowRepository.save(borrowing);
            
            return true;
        }else{
            const borrowedBook = await this.borrowRepository.find({
                where: {
                    returned : false,
                     user: { id: data.userId } ,
                       book: { id: data.bookId } ,
                }
            });
            if(borrowedBook) throw new Error("Book is not available to user!");
    
            const borrowing = new Borrowing();
            borrowing.book = book;
            borrowing.user = user;
            borrowing.borrowedAt = new Date();
            borrowing.createdAt = new Date();
            borrowing.returned = false;
    
            await this.borrowRepository.save(borrowing);
            
            return true;
        }
    }
    
}