import { ObjectId, Schema, SchemaTimestampsConfig } from 'mongoose'
import { IInvoice } from './IInvoice'

//For client.ts model
export interface IClient extends Document, SchemaTimestampsConfig {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    altPhone?: string;
    email: string;
    moneyOwed: boolean;
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    };
    notes?: string;
};