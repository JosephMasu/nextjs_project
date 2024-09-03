import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, 'please provide a username'],
        unique: true,
    },
    email:{
        type: String,
        required:[true, 'please provide an email'],
        unique: true,
    },
    password:{
        type: String,
        required:[true, 'please provide a password'],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: String,


})

const User = mongoose.models.users || mongoose.model('users', UserSchema);
export default User;