export {};
const mongoose = require('mongoose');
import { ObjectId } from 'bson';
import { Schema, SchemaTypes} from 'mongoose';
import { taskSchema } from './task';

export const invoiceSchema = new Schema ({
    invoiceName: {
        type: String,
        required: true
    },
    tasks: [{
        title: {
            type: String,
            required: true
        },
        materials: {
            type: String
        },
        materialsCost: {
            type: Number
        },
        price: {
           type: Number,
           required: true
        },
        notes: {
            type: String
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        }, 
  
    }],
    hasPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    datePaid: {
        type: Date
    },
    notes: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    created_at: {
        type: Date,
        index: true,
        default: Date.now()
    }
},
{
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    }
}
);
module.exports = mongoose.model("Invoice", invoiceSchema);