import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from 'bcrypt'

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    if (
        [email, username, hashPassword].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        email
    })

    if (existedUser) {
        throw new ApiError(409, "User with email already exists")
    }


    const user = await User.create({
        
        email,
        password:hashPassword,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password "
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})


export { registerUser }