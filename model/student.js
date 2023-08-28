const mongoose = require('mongoose');

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

module.exports = mongoose.model("student", studentModel);
