const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  images: [
    {
      name: String,
      public_id: String,
      url: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  track: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      remark: {
        type: String,
        required: true,
      },
      action: {
        type: String,
      },
      date: {
        type: date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Document", documentSchema);
