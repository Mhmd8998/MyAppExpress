const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");


module.exports= {
  insertUser: async (req, res) => {
        try {
            const username = req.body.name;
            const password = req.body.password;
            const email = req.body.email;
            const chickUser = await UserModel.findOne({username})
            if(chickUser){
              return res.json({message:"Already exists "})
            }else{
	        const hashPass = bcrypt.hashSync(password,10);

                const createuser = new UserModel({
                    name: username,
                    password: hashPass,
                    email: email
                 });
                await createuser.save();
                return res.json(createuser);
	    }
	    
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}
