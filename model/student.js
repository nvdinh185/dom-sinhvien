import mongoose from "mongoose";

const studentModel = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    }
  },
  {
    timestamps: false,
  }
);

export default mongoose.model("student", studentModel);
