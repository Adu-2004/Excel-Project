/*const UserModel = require("../models/User.js");

const getAllUsers = async (req, res) => {
   try{
        const users = await UserModel.find({}, {password:0});
        console.log(users)
        if(!users || users.length === 0) {
          return res.status(404).json({message:"NO Users Found"});
        }
        return res.status(200).json(users);
   }catch(error) {
    next(error);
   }
};


module.exports = getAllUsers; */