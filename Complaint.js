const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  username: { type: String, required: true },
  issue: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Processing, Complete
  createdAt: { type: Date, default: Date.now }   // Timestamp
});

module.exports = mongoose.model("Complaint", complaintSchema);
