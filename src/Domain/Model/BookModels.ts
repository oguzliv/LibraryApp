export interface CreateBookRequest {
    id: string;
    name: string;
}

export interface CreateBookResponse {
    name:string;
}

export interface BookResponse {
    id: string;
    name: string;
}

export interface GetBooksResponse {
    data: BookResponse[]
}

export interface GetBookDetailsResponse extends BookResponse {
    score: string;
}