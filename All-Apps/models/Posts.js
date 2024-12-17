const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' } // إشارة إلى المستخدم
});

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;
