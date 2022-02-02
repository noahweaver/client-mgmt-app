import { ObjectId, Schema } from 'mongoose'
import { IInvoice } from './IInvoice'

//For client.ts model
export interface IClient {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    altPhone?: string;
    email: string;
    invoices?: [IInvoice];
    moneyOwed: boolean;
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    };
    notes?: string;
};