export {};
const mongoose = require('mongoose');
import { ObjectId } from 'bson';
import { Schema, SchemaTypes } from 'mongoose';
import { taskSchema } from './task';

export const invoiceSchema = new Schema ({
    // tasks: {
    //     type: Array,
    //     required: true
    // },
    // tasks: {
    //     type: [taskSchema],
    //     required: true
    // },
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
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true
        // },
        // clientId: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Client",
        //     required: true
        // }
        // userId: {
        //     type: ObjectId()
        // },
        // clientId: {
        //     type: ObjectId
        // }
    }],
    hasPaid: {
        type: Boolean,
        required: true,
        default: false
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    
});
module.exports = mongoose.model("Invoice", invoiceSchema);