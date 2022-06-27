const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
    weight: {
        type: Number,
        required: true
    },
    macros: {
        type: Number,
    },
    foods: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        unique: true
    },
    weekDay: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
})

entrySchema.virtual('id').get(function() {
    return this._id.toHexString();
})

entrySchema.set('toJSON', {
    virtuals: true,
})

module.exports = mongoose.models.Entry ||  mongoose.model('Entry', entrySchema)