const { db: mongoose, Schema } = require('../dbconfig/mongoose');

const videoTagSchema = new Schema(
    {
        guid: { type: String },
        tags: { type: Object },
        videoPlayUrl: { type: String },
    },
    {
        collection: 'video',
        versionKey: false,
    }
);

module.exports = videoTagSchema;