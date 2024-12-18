const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");


module.exports= {
  insertUser: async (req, res) => {
        try {
            const username = req.body.name;
            const password = req.body.password;
            const email = req.body.email;
            const chickUser = UserModel.findOne({username})
            if(chickUser){
              return res.json({message:"Already exists "})
            }
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
}
