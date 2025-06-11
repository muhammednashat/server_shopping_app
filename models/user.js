const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name:{type:String,required:true,trim : true},
    email:{type:String,required:true,trim : true},
    phone:{type:String ,required:true,trim : true},
    isAdmin:{type:Boolean, default:false},
    address:{type:String },
    passwordHash:String,
    resetPasswordOtp:Number,
    resetPasswordOtpExpires:Date,

})

userSchema.index({email:1},{unique:true})

exports.User = model('User', userSchema);