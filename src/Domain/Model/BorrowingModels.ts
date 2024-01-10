export interface BorrowBookRequest {
    userId:number;
    bookId:number;
}

export interface BorrowBookResponse {

}

export interface ReturnBookRequest {
    userId:number;
    bookId:number;
    score: number;
}

export interface ReturnBookResponse {
}
