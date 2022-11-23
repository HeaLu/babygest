import mongoose from "mongoose";

const BainSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Bain || mongoose.model("Bain", BainSchema);
