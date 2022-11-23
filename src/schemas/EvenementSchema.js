import mongoose from "mongoose";

const EvenementSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
});

export default mongoose.models.Evenement || mongoose.model("Evenement", EvenementSchema);
