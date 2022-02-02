import { IInvoice } from "./IInvoice";

//For task.ts Model
export interface ITask extends Document{
    title: string;
    materials?: string;
    materialsCost?: number;
    price: number;
    notes?: string;
    completed: boolean;
};