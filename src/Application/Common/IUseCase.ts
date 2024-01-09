export interface IUseCase<I,O = void> {
    execute(data: I): Promise<O>;
}