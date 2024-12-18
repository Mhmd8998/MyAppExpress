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
    login: async (req,res) => {
        
        const {name,password} = req.body;
        const existingUser = await UserModel.findOne({name:name});
        
        if(!existingUser){
            return res.status(404).json({message:"user is not existing"});
        }
        const chickPass = bcrypt.compareSync(password,existingUser.password);
        if(!chickPass){
            return res.status(404).json({message:"username or password is not fund"});
        }

        const token = jwt.sign({id:existingUser._id},"SECRET",{expiresIn:"1h"});
        res.status(201).json({message:"login successfuly",token})
    }
}
