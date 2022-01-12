import { Schema } from "mongoose";
import { ITask } from "./ITask";

//For invoice.ts model
export interface IInvoice extends Document {
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    tasks: Array<ITask> | null | undefined;
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    hasPaid: boolean,
    notes?: string,
};