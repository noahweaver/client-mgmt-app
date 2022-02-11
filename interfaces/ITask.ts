import { IInvoice } from "./IInvoice";

//For task.ts Model
export interface ITask{
    title: string;
    materials?: string;
    materialsCost?: number;
    price: number;
    notes?: string;
    completed: boolean;
};

