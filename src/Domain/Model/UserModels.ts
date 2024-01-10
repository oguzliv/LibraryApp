export interface CreateUserRequest {
    name: string;
}

export interface CreateUserResponse {
    name:string;
}

export interface UserResponse {
    id: number;
    name: string;
}

export interface PastBook {
    name: string;
    userScore: number;
}

export interface PresentBook {
    name: string;
}

export interface GetUsersResponse {
    data:UserResponse[]
}

export interface UserDetailsResponse extends UserResponse {
    books:{
        past:PastBook[],
        present:PresentBook[]
    }
}

export interface GetUserByIdRequest {
    id: number;
}