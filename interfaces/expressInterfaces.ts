export interface IRequest {
    body: any;
    json: any;
    user?: any;
    params: any;
};
export interface IResponse {
    status(arg: number): any;
    send(arg: any): any
    body: any;
    json: any;
    user?: any;
};