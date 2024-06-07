const express = require ('express');
const verifyToken = require('../middleware/authMiddleWare');
const { activeSessions, logOutFromAllDevices, logout } = require('../controllers/sessionController');

const router = express.Router();

router.get('/active-sessions', verifyToken, activeSessions)
router.post('/logout/:sessionId', logout)
router.post('/logout-all', verifyToken, logOutFromAllDevices)

module.exports =  router;