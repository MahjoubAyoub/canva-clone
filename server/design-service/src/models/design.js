const mongoose = require("mongoose");

const DesignSchema = new mongoose.Schema({
  userId: String,
  name: String,
  username: String,
  canvasData: String,
  width: Number,
  height: Number,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  public: { type: Boolean, default: false },
  sharedBy: { type: String }, // userId of the sharer
  username: { type: String }, // username of the owner or sharer
});

const Design = mongoose.models.Design || mongoose.model("Design", DesignSchema);
module.exports = Design;
