import { ObjectId, Schema } from 'mongoose'
import { IInvoice } from './IInvoice'

//For client.ts model
export interface IClient extends Document {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    altPhone?: string;
    email?: string;
    invoices: Array<IInvoice> | null | undefined;
    moneyOwed: boolean;
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    };
    notes?: string;
    _id?: string;
};