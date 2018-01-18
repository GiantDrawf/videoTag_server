const { db: mongoose, Schema } = require('../dbconfig/mongoose');

const testSchema = new Schema(
    {
        guid: { type: String },
        tags: { type: Number },
        videoPlayUrl: { type: String },
        index: { type: Number },
    },
    {
        collection: 'test',
        versionKey: false,
    }
);

module.exports = testSchema;