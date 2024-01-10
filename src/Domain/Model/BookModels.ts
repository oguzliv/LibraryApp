export interface CreateBookRequest {
    name: string;
}

export interface CreateBookResponse {
    name:string;
}

export interface BookResponse {
    id: number;
    name: string;
}

export interface GetBooksResponse {
    data: BookResponse[]
}

export interface GetBookDetailsResponse extends BookResponse {
    score: any;
}

export interface GetBookByIdRequest {
    id: number;
}