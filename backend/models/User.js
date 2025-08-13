const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema( {
     
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
         type: String, 
         enum: ['user', 'admin'], 
         default: 'user'
     },
    fileUploadCount: {
        type: Number,
         default: 0
    },
   
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;