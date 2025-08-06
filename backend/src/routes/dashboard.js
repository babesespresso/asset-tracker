const express = require('express');
const memoryDB = require('../config/memoryDB');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/stats')
  .get(async (req, res) => {
    try {
      const stats = memoryDB.getDashboardStats();
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  });

module.exports = router;
