import * as mongoose from "mongoose"

const infoSchema =  new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
})

export const infoModel =  mongoose.model('Info', infoSchema)