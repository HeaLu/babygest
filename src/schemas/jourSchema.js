import { startOfDay } from "date-fns";
import mongoose from "mongoose";

const JourSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  biberons: [
    {
      heure: { type: Date, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  couches: [
    {
      heure: { type: Date, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      caca: { type: Boolean, default: false },
    },
  ],
  vitamineD: { Boolean },
  evenements: [
    {
      heure: { type: Date, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      message: String,
    },
  ],
});

export default mongoose.models.Jour || mongoose.model("Jour", JourSchema);
