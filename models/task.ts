export {};
const mongoose = require('mongoose');
import { ObjectID, ObjectId } from 'bson';
import { Schema } from 'mongoose';
// require('mongoose-currency').loadType(mongoose);
// const Currency = mongoose.Types.Currency;


export const taskSchema = new Schema ({
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
    invoiceId: {
        type: Schema.Types.ObjectId,
        ref: "Invoice",
        required: true
    }
});

module.exports = mongoose.model("Task", taskSchema);