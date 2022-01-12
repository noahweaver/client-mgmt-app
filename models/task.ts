export {};
const mongoose = require('mongoose');
import { Schema } from 'mongoose';
import { ITask } from '../interfaces/ITask';
// require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


export const taskSchema = new Schema<ITask> ({
    title: {
        type: String,
        required: true
    },
    materials: {
        type: Array
    },
    materialsCost: {
        type: Boolean
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
    }
});






module.exports = mongoose.model("Task", taskSchema);