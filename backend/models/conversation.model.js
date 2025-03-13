import mongoose from "mongoose";

const conversation = new mongoose.Schema(
    {
        participants: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
)