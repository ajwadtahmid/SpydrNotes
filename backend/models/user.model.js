import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // member since july 2021 createdAt 
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note",
            default: []
        }
    ],
    mindmaps: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mindmap",
            default: []
        }
    ]
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;