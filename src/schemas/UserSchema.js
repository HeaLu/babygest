import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
