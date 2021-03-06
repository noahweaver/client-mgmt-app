export {};
const mongoose = require('mongoose');
import { Schema } from 'mongoose';
import { IClient } from '../interfaces/IClient';
import { invoiceSchema } from './invoice';

export const clientSchema = new Schema<IClient>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    altPhone: {
        type:String
    },
    email: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
   
},
{
    timestamps: {
        
    }
}
);

module.exports = mongoose.model("Client", clientSchema);