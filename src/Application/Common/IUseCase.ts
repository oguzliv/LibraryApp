export interface IUseCase<I= void,O = void> {
    execute(data: I): Promise<O>;
}