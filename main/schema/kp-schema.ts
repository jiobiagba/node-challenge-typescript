import * as mongoose from "mongoose"

const infoSchema =  new mongoose.Schema({
    key: {
        type: String,
        required: true,
        validate: {
            validator: function(l: string): boolean {
                return l.length > 1
            },
            message: "Key MUST be more than 1 string character."
        }
    },
    value: {
        type: String,
        required: true,
        validate: {
            validator: function(b: string): boolean {
                return b.length > 1
            },
            message: "Value MUST be more than 1 string character."
        }
    },
    timestamp: {
        type: Number,
        required: true
    }
})

export const infoModel =  mongoose.model('Info', infoSchema)