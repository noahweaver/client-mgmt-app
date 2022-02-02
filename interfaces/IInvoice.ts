import { ObjectID, ObjectId } from "bson";
import { Schema } from "mongoose";
import { IClient } from "./IClient";
import { ITask } from "./ITask";



//For invoice.ts model
export interface IInvoice extends Document{
    tasks: Array<ITask>,
    hasPaid: boolean,
    notes?: string,
    // client: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Client"
    // },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client",
    }
    // _id: {
    //     type: Schema.Types.ObjectId
    // }
};