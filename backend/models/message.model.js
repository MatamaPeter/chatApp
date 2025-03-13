import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            
        },
        receiverId: {
            type: mongooose.Schema.Types.ObjectId,
            ref: "User",
            unique:true
        },
        message: {
            type: String,
            required: true
        },
        
    },
    {timestamps: true}
)

const Message = mongoose.model("Message", messageSchema)

export default Message;