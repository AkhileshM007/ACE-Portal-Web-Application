const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Newsletter title is required"]
  },
  content: {
    type: String,
    required: [true, "Newsletter content is required"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member"
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published"
  }
}, {
  timestamps: true
});

newsletterSchema.index({ date: -1 });
newsletterSchema.index({ status: 1 });

module.exports = mongoose.model("Newsletter", newsletterSchema);