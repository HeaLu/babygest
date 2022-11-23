import mongoose from "mongoose";

const VitamineSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Vitamine || mongoose.model("Vitamine", VitamineSchema);
