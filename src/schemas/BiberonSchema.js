import mongoose from "mongoose";

const BiberonSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

export default mongoose.models.Biberon || mongoose.model("Biberon", BiberonSchema);
