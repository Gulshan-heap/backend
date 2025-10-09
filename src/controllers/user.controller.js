import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists : username, email
    // check for images, check for avatar
    // upload them to cloudinary , avatar successfully uploaded or not
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return response
    // else error 


    // getting user details
    const {fullname,email,username,password} = req.body
    console.log("username: ",username);

    //validation
    if(
        [fullname,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"fullname is required")
    }

    //checking if user already exists
    const existingUser = User.findOne({
        $or:[{username}, {email}]
    })

    if(existingUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    //checking images and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0].path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is needed!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar image is needed!")
    }

    //entry in database 
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase()
    })

    //checking if database exists or not
    const createdUser = await User.findById(user._id).select(
        //fields which we don't want
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong in Api response")
    }


    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )







})

export {registerUser}