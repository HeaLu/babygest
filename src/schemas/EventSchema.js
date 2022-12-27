import mongoose from "mongoose";
import { eventTypesList } from "../config";

const EventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: eventTypesList() },
  payload: {
    caca: Boolean,
    message: String,
  },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
