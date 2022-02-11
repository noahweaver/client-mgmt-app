import { ObjectID, ObjectId } from "bson";
import { Schema, SchemaTimestampsConfig } from "mongoose";
import { IClient } from "./IClient";
import { ITask } from "./ITask";



//For invoice.ts model
export interface IInvoice extends Document, SchemaTimestampsConfig{
    invoiceName: string,
    datePaid?:Date,
    tasks: Array<ITask>,
    feesAndTaxes?: number,
    totalPrice: number,
    hasPaid: boolean,
    notes?: string,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client",
    },
};

export interface IAddInvoiceForm {
    invoiceName: string,
    datePaid?: Date,
    tasks: Array<ITask>,
    feesAndTaxes?: number,
    totalPrice: number,
    hasPaid: boolean,
    notes?: string,
    userId: string,
}