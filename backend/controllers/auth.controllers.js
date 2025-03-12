import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmpassword, gender } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({error:"passwords don't match"})
        }
        const user = await User.findOne({userName})

        if (user) {
            return res.status(400).json({error:"username already taken"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic :gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id,res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            
            })
        } else {
            res.status(400).json({error:"Invalid user data"})
        }
    } catch (error) {
        console.log(error);
        
    }
}

export const login = asynce(req, res) => {
    console.log("login");  
}

export const logout = (req, res) => {
    console.log("logout");
    
}