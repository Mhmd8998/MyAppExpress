const mongoose = require('mongoose');
const UserModel = require('../models/Users'); // تأكد من أن المسار صحيح
const bcrypt = require("bcryptjs");

module.exports = {
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
            const userName = req.params.name; // استخدام اسم المستخدم بدلاً من معرف المستخدم

            const updatedUser = await UserModel.findOneAndUpdate({ name: userName }, req.body, { new: true });
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
            const userName = req.params.name; // استخدام اسم المستخدم بدلاً من معرف المستخدم

            const deleteUser = await UserModel.findOneAndDelete({ name: userName });
            if (!deleteUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
