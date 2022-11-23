import mongoose from "mongoose";

const CoucheSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    caca: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

export default mongoose.models.Couche || mongoose.model("Couche", CoucheSchema);
