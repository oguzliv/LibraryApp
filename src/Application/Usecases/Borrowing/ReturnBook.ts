import { IUseCase } from "Application/Common/IUseCase";
import { User } from "../../../Domain/Entity/User";
import AppDataSource from "../../../Infrastructure/DataSource";
import { ReturnBookRequest } from "../../../Domain/Model/BorrowingModels";
import { Borrowing } from "../../../Domain/Entity/Borrowing";
import { Book } from "../../../Domain/Entity/Book";

export class ReturnBook implements IUseCase<ReturnBookRequest,boolean>{
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
    public async execute(data: ReturnBookRequest): Promise<boolean> {
        const user = await this.userRepository.findOneBy({id: data.userId})
        if(!user) throw new Error("User not exist");

        const book = await this.bookRepository.findOneBy({id: data.bookId})
        if(!book) throw new Error("Book not exist");

        const borrowedBook = await this.borrowRepository.findOne({
            where: {
                returned : false,
                 user: { id: data.userId } ,
                   book: { id: data.bookId } ,
            }
        });
        console.log("book : ", borrowedBook);
        console.log("data : ", data);
        if(!borrowedBook) throw new Error("User has no books to return");
        borrowedBook.returned = true;
        borrowedBook.returnedAt = new Date();

        try{
            await this.borrowRepository.update(borrowedBook,{returned: true, returnedAt: new Date()});
            

            const returnCount = await this.borrowRepository.count({
                where : {
                    returned: true,
                    book: {id: book.id}
                }
            })
            const newScore = book.score == -1 ? data.score : (book.score + data.score) / returnCount;

            await this.bookRepository.update({id: book.id},{score: newScore});
            await this.borrowRepository.save(borrowedBook);
        }catch(err){
            console.error(err);
        }

        return true;
    }
    
}