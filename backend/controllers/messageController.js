import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js"
import { io, userSocketMap } from "../server.js";


// Get all users except the logged in user
export const getUsersForSidebar = async (req, res)=>{
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        // Count unseen messages using countDocuments instead of fetching full documents
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user)=>{
            const count = await Message.countDocuments({senderId: user._id, receiverId: userId, seen: false})
            if(count > 0){
                unseenMessages[user._id] = count;
            }
        })
        await Promise.all(promises);
        res.json({success: true, users: filteredUsers, unseenMessages})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Server error"})
    }
}

// Get all messages for selected user
export const getMessages = async (req, res) =>{
    try {
        const { id: selectedUserId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })
        await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true});

        res.json({success: true, messages})

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Server error"})
    }
}

// Mark message as seen — only if current user is the receiver
export const markMessageAsSeen = async (req, res)=>{
    try {
        const { id } = req.params;
        const message = await Message.findById(id);

        if (!message) {
            return res.status(404).json({success: false, message: "Message not found"});
        }

        if (message.receiverId.toString() !== req.user._id.toString()) {
            return res.status(403).json({success: false, message: "Unauthorized"});
        }

        message.seen = true;
        await message.save();
        res.json({success: true})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Server error"})
    }
}

// Send message to selected user
export const sendMessage = async (req, res) =>{
    try {
        const {text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({success: false, message: "Message cannot be empty"});
        }

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        // Emit the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json({success: true, newMessage});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "Server error"})
    }
}
