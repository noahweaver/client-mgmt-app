//Express Interfaces
export interface IRequest {
    body: any;
    json: any;
}
export interface IResponse {
    status(arg: number): any;
    send(arg: any): any
    body: any;
    json: any;
}