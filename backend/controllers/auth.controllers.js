import User from "../models/user.model.js";

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

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password,
            gender,
            profilePic :gender === 'male' ? boyProfilePic : girlProfilePic
        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
            
        })
    } catch (error) {
        res.status(500).json({error:"Internal server error"})       
    }
}

export const login = (req, res) => {
    console.log("login");
    
}

export const logout = (req, res) => {
    console.log("logout");
    
}