import mongoose from "mongoose";
import { eventTypesList } from "../config";

const buildSuivis = () => {
  let retour = [];
  eventTypesList().forEach((e) => {
    retour.push({ label: e.label, type: Boolean });
  });
};

const traitementSchema = new mongoose.Schema({});

const BabySchema = new mongoose.Schema({
  birth: { type: Date, required: true },
  firstName: { type: String, required: true },
  gender: { type: String, enum: ["M", "F"], required: true },
  guardians: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  suivis: buildSuivis(),
  traitements: [traitementSchema],
});

export default mongoose.models.Baby || mongoose.model("Baby", BabySchema);
