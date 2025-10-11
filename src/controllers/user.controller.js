import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
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
    // validate required string fields
    if ([fullname, email, username, password].some((field) => !field || String(field).trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    //checking if user already exists
    const existingUser = await User.findOne({
        $or:[{username}, {email}]
    })

    if(existingUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    //console.log(req.files);

    //checking images and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) { // Check if coverImage exists and is a non-empty array
        coverImageLocalPath = req.files.coverImage[0].path
    } 

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is needed!")
    }

    const avatar = avatarLocalPath ? await uploadOnCloudinary(avatarLocalPath) : null;
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    if (!avatar) {
        throw new ApiError(400, "Avatar image is needed!");
    }

    //entry in database 
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    //checking if database exists or not
    const createdUser = await User.findById(user._id).select(
        //fields which we don't want
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    // Created — return 201 with created resource
    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));







})

export {registerUser}