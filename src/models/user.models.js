import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true //to make it searchable
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true //to make it searchable
    },
    avatar:{
        type: String, //cloudinary url
        required: true,
    },
    coverImage:{
        type: String //cloudinary url
    },
    watchHistory:[
        {
        type: Schema.Types.ObjectId,
        ref: "Video"
        }
    ],
    password:{
        type: String ,//it should be encrypted
        required: [true,"password is required"]
    },
    refreshToken:{
        type: String 
    }
    },
    {
        timestamps:true
    }
)

//method to generate jwt token and hash the passwords
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next() //if password is not modified then no need to hash again
    this.password = await bcrypt.hash(this.password,10) //10 is salt rounds
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {   _id: this._id,
            username: this.username,
            fullname: this.fullname,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
//exporting the model
}

export const User = mongoose.model("User",userSchema)