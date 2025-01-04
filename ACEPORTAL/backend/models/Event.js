const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    default: "" 
  },
  registeredMembers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Member" 
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Event", eventSchema);