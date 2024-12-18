const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");

module.exports = {
    insertUser: async (req, res) => {
        try {
            const { name, password, email } = req.body;

            // التحقق من وجود المستخدم بناءً على الاسم والبريد الإلكتروني
            const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });

            if (existingUser) {
                return res.status(400).json({ message: "User with this name or email already exists." });
            } else {
                const hashPass = bcrypt.hashSync(password, 10);

                const createUser = new UserModel({
                    name,
                    password: hashPass,
                    email
                });

                await createUser.save();
                return res.status(201).json({ message: "User created successfully", user: createUser });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}
