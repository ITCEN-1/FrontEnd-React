export type BaseResponse<T> = {
    code: string;
    message: string;
    content?: T;
}