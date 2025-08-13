const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileName: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("File", fileSchema);
