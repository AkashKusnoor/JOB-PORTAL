const express = require('express');
const sessionService = require('../services/sessionService');
//const verifyToken = require('./verifyToken');
 

 
const activeSessions = async (req, res) => {
  try {
const userId = req.user.id;
    const sessions = await sessionService.getActiveSessions(userId);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active sessions' });
  }
}

const logout =  async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    await sessionService.logoutSession(sessionId);
    res.json({ message: 'Successfully logged out' });
  } catch (error) {
    res.status(400).json({ message: 'Error logging out' });
  }
};
 
const logOutFromAllDevices = async (req, res) => {
  try {
const userId = req.user.id;
    await sessionService.logoutAllSessions(userId, req.sessionID); // Exclude current session
    res.json({ message: 'Successfully logged out from all devices' });
  } catch (error) {
    res.status(400).json({ message: 'Error logging out from all devices' });
  }
};
 
// Additional session routes (e.g., update session details)

module.exports = { activeSessions , logout, logOutFromAllDevices}
 