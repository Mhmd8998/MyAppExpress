const mongoose = require("mongoose");
const PostModel = require("../models/Posts"); // تأكد من أن اسم النموذج صحيح

module.exports= {
    insertPost: async (req, res) => {
        try {
            const createpost = new PostModel({
                title: req.body.title,
                content: req.body.content,
                author: req.body.author // يجب استخدام "author" بدلاً من "_id"
            });
            await createpost.save();
            return res.json(createpost);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAllPosts: async (req,res) => {
        try{
            const posts = await PostModel.find();
            return res.json(posts);
        }catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
