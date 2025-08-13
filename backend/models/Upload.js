/*const mongoose =  require("mongoose");
const multer = require('multer');
const path = require('path');

//const Schema = mongoose.Schema;
const uploadSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        require: true,
    },
     filename: {
       type: String,
       require: true,
    },
     filepath:{
       type:String,
       require: true,
    },
     clouldinary_id:{
       type:String,
       require:false,
    },
     columns:{
      type:[String],
      default:[],
    },
   createAt:{
      type:Data,
      default:Data.now,
    },
    size:{
      type:Number,
      require: true,
 },
}); 
const Upload = mongoose.model('Upload', uploadSchema);
module.exports = {Upload}; 
*/
// models/Upload.js

const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  originalname: String,
  filename: String,
  mimetype: String,
  size: Number,
  cloudinaryUrl: String,
  public_id: String
}, { timestamps: true });

module.exports = mongoose.model('Upload', uploadSchema);




