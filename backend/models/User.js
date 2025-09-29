const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema( {
     
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
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
     isActive: { 
        type: Boolean,
         default: true
    },
    lastLogin: { type: Date },  
   createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;