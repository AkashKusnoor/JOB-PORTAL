const mongoose = require('mongoose');
 
const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  deviceId: { type: String, required: true },
  deviceType: { type: String, required: true }, // (e.g., "web", "mobile")
  location: { type: String }, // (optional)
  ipAddress: { type: String, required: true },
  lastActivity: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});
 
module.exports = mongoose.model('Session', sessionSchema);