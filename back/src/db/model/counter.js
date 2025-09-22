const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const CounterSchema = new Schema({ 
    name : {
        type: String,
        required: true,
    },
    totalPost : {
        type: Number,
        required: true,
    }
}, { versionKey : false })
exports.Counter = mongoose.model('Counter', CounterSchema);
