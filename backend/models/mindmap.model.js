import mongoose from "mongoose";

const mindmapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        default: "Untitled",
    },
    node: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true }
);

const Mindmap = mongoose.model("Mindmap", mindmapSchema);

export default Mindmap;