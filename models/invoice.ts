export {};
import { Schema } from 'mongoose';
import { IInvoice } from '../interfaces/IInvoice';
import { taskSchema } from './task';

export const invoiceSchema = new Schema<IInvoice> ({
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    tasks: {
        type: [taskSchema],
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hasPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    notes: {
        type: String
    }
});
