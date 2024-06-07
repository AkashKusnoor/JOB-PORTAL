

const sessionModels = require('../models/sessionModels');
 
const getActiveSessions = async (userId) => {
  const sessions = await sessionModels.find({ userId, isActive: true });
  return sessions;
};
 
const updateSession = async (userId, ipAddress) => {
  const existingSession = await Session.findOne({ userId });
  if (existingSession) {
    existingSession.lastActivity = Date.now();
    existingSession.ipAddress = ipAddress;
    await existingSession.save();
  } else {
    const newSession = new Session({ userId, deviceId: 'unknown', deviceType: 'unknown', ipAddress });
    await newSession.save();
  }       
};
 
const logoutSession = async (sessionId) => {
  await Session.findByIdAndUpdate(sessionId, { isActive: false });
};
 
const logoutAllSessions = async (userId, currentSessionId) => {
  await Session.updateMany({ userId, _id: { $ne: currentSessionId } }, { isActive: false });
};
 
module.exports = { getActiveSessions, updateSession, logoutSession, logoutAllSessions };