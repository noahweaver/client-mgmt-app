export interface IRequest {
    body: any;
    json: any;
    user?: any;
    params: any;
};
export interface IResponse {
    sendFile(arg0: any);
    status(arg: number): any;
    send(arg: any): any
    body: any;
    json: any;
    user?: any;
};