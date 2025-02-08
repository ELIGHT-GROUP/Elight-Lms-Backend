export interface ErrorResponse {
    status: string;
    message: string;
    stack?: string;
    errors?: any;
    statusCode?:number;
}