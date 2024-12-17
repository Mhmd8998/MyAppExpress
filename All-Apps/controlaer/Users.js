const mongoose = require('mongoose');
const UserModel = require('../models/Users'); // تأكد من أن المسار صحيح
const bcrypt = require("bcryptjs");

module.exports = {
    insertUser: async (req, res) => {
        try {
            const username = req.body.name;
            const password = req.body.password;
            const email = req.body.email;

	   const hashPass = bcrypt.hashSync(password,10);

            const createuser = new UserModel({
                name: username,
                password: hashPass,
                email: email
            });
            await createuser.save();
            return res.json(createuser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id; // استخدم معرف المستخدم بدلاً من الاسم
            const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id; // استخدم معرف المستخدم بدلاً من الاسم
            const deleteUser = await UserModel.findByIdAndDelete(userId);
            if (!deleteUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.send("User deleted successfully");
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
